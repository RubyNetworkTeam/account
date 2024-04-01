/**
 * @description Building application and runner for nodejs and bun enviroments
 * @author CarlosNunezMX
 * With love from Jalisco Mexico
 */
import { exec, execFileSync, execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
function getCustomArgs(_args, obj) {
    _args
        .map(arg => arg.split('='))
        .forEach(m => {
            if (m[1] === "true" || m[1] === "false")
                return obj[m[0]] = Boolean(m[1]);

            if (!isNaN(Number(m[1])))
                return obj[m[0]] = Number(m[1]);

            return obj[m[0]] = m[1];
        });
}
const nodeModules = resolve(process.cwd(), 'node_modules')

function certGeneration(moduleType){
    if(
        existsSync(resolve(process.cwd(), "server.key") ||
        existsSync(resolve(process.cwd(), "server.crt")
    ))){
        console.log("[Certification] - Files already exists, skiping...")
        return;
    }
    
    try{
        if(!process.isBun){
            console.log("[Certificate] - You're using Node, running with ", moduleType, " package manager.");
            const command = `${moduleType} run generateCert`;
            execSync(command, {
                stdio: 'inherit'
            })
            console.log("[Certificate] - Certificates has been created!");
        }

        else {
            console.log("[Certificate] - You're using Bun, running with bun!");
            const command = `bun generateCert`;
            execSync(command, {
                stdio: "inherit"
            })
            console.log("[Certificate] - Certificates has been created!");
        }
    }catch(err){
        console.error("Could not create server certs... Try doing it manually.");
        process.exit(1)
    }
}

function PackageManager() {
    if (!process.isBun) {
        const packagemanagers = [{
            name: "pnpm",
            command: 'pnpm install'
        }, {
            name: "npm",
            command: 'npm install'
        }, {
            name: "yarn",
            command: 'yarn install'
        }];
        for (let i = 0; i < packagemanagers.length; i++) {
            const pkg_mgr = packagemanagers[i];
            try {
                const res = execSync(`${pkg_mgr.name} -v`);
                console.log(`[Installing Deps] - ${pkg_mgr.name} found!`);
                execSync(pkg_mgr.command)
                console.log(`[Installing Deps] - Finished to install deps.`);
                certGeneration(pkg_mgr.name)
                break;
            } catch (error) {
                console.log(`[Installing Deps] - ${pkg_mgr.name} not fount`);
            }
        }
    }

    try {
        console.log('[Installing Deps] - Installing deps with Bun.');
        execSync('bun install');
        console.log('[Installing Deps] - Installed all deps.');
        certGeneration()
    } catch (err) {
        console.error("Could not install deps with bun, try deleting 'node_modules' folder and bun.lockb");
        console.log(err);
        process.exit(1)
    }
}
function Building(args = { dev: false }) {
    const hasModules = existsSync(nodeModules);
    if (!hasModules)
        PackageManager();
    console.log('[Building] - Modules are now installed!')

    if (process.title === "node") {
        console.log('[Building] - Starting compilation in', args.dev ? "dev" : "production", 'mode');
        try {
            if (args.dev)
                exec('npx tsc -w');
            else
                execSync('npx tsc');
        }catch(err){
            console.error("[Compilation Failed] - Errror while compiling typescript");
            console.error(err.stderr.toString() || err.stdout.toString());
            process.exit(1)
        }
        console.log('[Building] - Compilation finished!');
        return;
    }
    console.log('You dont need that, you\'re in Bun ♥');
    return;
}
function Run(args = {dev: false}){
    const hasModules = existsSync(nodeModules);
    if (!hasModules)
        PackageManager();
    try {
        console.log('[Running] - Using', process.title);
        if(process.title === 'node'){
            return execSync(!args.dev ?'node dist/index.js' : 'node --watch dist/index.js', {stdio: 'inherit'});
        }
        execSync(!args.dev ? 'bun run source/index.ts' : 'bun run -w source/index.ts', {stdio: "inherit"})
    }catch(err){
        console.error('[Failed to run] - Showning Error bellow.\nEnviroment:', process.title, '\nVersion:', process.version);
        console.error(err.stderr.toString());
    }
}
function Main() {
    console.log("[Shouko] - RubyNetwork Account Server Building Tool.");
    const [_, __, action, ..._args] = process.argv;
    const args = {
        packageManager: "",
        dev: false
    }
    getCustomArgs(_args, args);

    if (action === "build")
        return Building(args)

    if(action === "run" || !action)
        return Run()
}

if (import.meta.main || process.title === "node")
    Main();