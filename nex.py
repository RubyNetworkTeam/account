from nintendo.nex import rmc, kerberos, friends, authentication, common, settings, notification, streams

import collections

import secrets

import aioconsole

import asyncio



import logging

logging.basicConfig(level=logging.INFO)





User = collections.namedtuple("User", "pid name password")



users = [

	User(2, "Quazal Rendez-Vous", "password"),

	User(1, "1", "password")

	#More accounts here

]



def get_user_by_name(name):

	for user in users:

		if user.name == name:

			return user

 

def get_user_by_pid(pid):

	for user in users:

		if user.pid == pid:

			return user

 

def derive_key(user):

	deriv = kerberos.KeyDerivationOld(65000, 1024)

	return deriv.derive_key(user.password.encode("ascii"), user.pid)



	

SECURE_SERVER = "Quazal Rendez-Vous"



class AuthenticationServer(authentication.AuthenticationServer):

	def __init__(self, settings):

		super().__init__()

		self.settings = settings

	

	async def login(self, client, username):

		print("User trying to log in:", username)

 

		user = get_user_by_name(username)

		if not user:

			raise common.RMCError("RendezVous::InvalidUsername")

 

		server = get_user_by_name(SECURE_SERVER)

 

		url = common.StationURL(

			scheme="prudps", address="127.0.0.1", port=1224,

			PID = server.pid, CID = 1, type = 2,

			sid = 1, stream = 10

		)

 

		conn_data = authentication.RVConnectionData()

		conn_data.main_station = url

		conn_data.special_protocols = []

		conn_data.special_station = common.StationURL()

 

		response = rmc.RMCResponse()

		response.result = common.Result.success()

		response.pid = user.pid

		response.ticket = self.generate_ticket(user, server)

		response.connection_data = conn_data

		response.server_name = "Friends server"

		return response

 

	def generate_ticket(self, source, target):

		settings = self.settings

 

		user_key = derive_key(source)

		server_key = derive_key(target)

		session_key = secrets.token_bytes(settings["kerberos.key_size"])

 

		internal = kerberos.ServerTicket()

		internal.timestamp = common.DateTime.now()

		internal.source = source.pid

		internal.session_key = session_key

 

		ticket = kerberos.ClientTicket()

		ticket.session_key = session_key

		ticket.target = target.pid

		ticket.internal = internal.encrypt(server_key, settings)

 

		return ticket.encrypt(user_key, settings)



class FriendsServer(friends.FriendsProtocolV2):

	def __init__(self):

		self.methods = {

			self.METHOD_UPDATE_AND_GET_ALL_INFORMATION: self.handle_update_and_get_all_information

		}

	async def update_and_get_all_information(self, *args):
		comment = friends.FriendComment()
		comment.unk1 = 1
		comment.comment = "Hi"
		comment.unk2 = common.DateTime.now()
		principal_preference = friends.PrincipalPreference()
		principal_preference.show_online_status = True
		principal_preference.show_current_title = True
		principal_preference.block_friend_requests = False

		obj = rmc.RMCResponse()

		obj.principal_ids = 1

		obj.principal_preference = principal_preference

		obj.comment = comment

		obj.friends = None

		obj.sent_requests = None

		obj.received_requests = None

		obj.blacklist = None

		obj.unk1 = True

		obj.unk2 = True

		obj.notifications = None

		return obj

	async def handle(self, client, method_id, input, output):

		await self.methods[method_id](client, input, output)

	async def handle_update_and_get_all_information(self, client, input, output):

		nna_info = input.extract(friends.NNAInfo)

		presence = input.extract(friends.NintendoPresenceV2)

		birthday = input.datetime()

		response = await self.update_and_get_all_information(client, nna_info, presence, birthday)

 

		#--- response ---

		output.add(response.principal_preference)

		output.add(response.comment)

		output.list(response.friends, output.add)

		output.list(response.sent_requests, output.add)

		output.list(response.received_requests, output.add)

		output.list(response.blacklist, output.add)

		output.bool(response.unk1)

		output.list(response.notifications, output.add)

		output.bool(response.unk2)



async def main():



	s = settings.load("friends")

	s.configure("ridfebb9", 20000)

	# FriendsServer = friends.FriendsServerV2

	auth_servers = [

		AuthenticationServer(s)

	]

	secure_servers = [

		FriendsServer()

	]

	

	server_key = derive_key(get_user_by_name(SECURE_SERVER))

	async with rmc.serve(s, auth_servers, "127.0.0.1", 1223):

		async with rmc.serve(s, secure_servers, "127.0.0.1", 1224, key=server_key):

			await aioconsole.ainput("Press enter to exit...\n")



asyncio.run(main())

