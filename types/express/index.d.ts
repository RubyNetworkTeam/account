declare namespace Express {
    interface Response {
        /**
         * 
         * @param Content {import("xml2js").XmlElement}
         * @param options {import("xml2js").XmlOptions}
         * @returns {void}
         */
        xml: (Content: XmlElement | XmlElement[], options?: XmlOptions) => void
    }
}
