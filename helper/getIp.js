require('isomorphic-fetch');
const fs = require('fs');
require('dotenv').config();
const {
    CLOUDFLARE_ZONE,
    CLOUDFLARE_EMAIL,
    CLOUDFLARE_KEY,
} = process.env;

async function getIP() {
    try {
        let getIPReq = await fetch(`http://ip-api.com/json/?fields=status,query`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let getIPRes = await getIPReq.json();
        return getIPRes;
    } catch (e) {
        console.log("getIP", e);
        return {
            status: false,
        };
    }
}

async function readFileJSON(fileUrl) {
    try {
        // parse JSON string to JSON object
        return JSON.parse(fs.readFileSync(fileUrl, 'utf8'));
    } catch (e) {
        console.log("readFileJSON", e);
        return {
            status: false,
            query: "dongnv"
        };
    }

};

function writeFileJSON(fileUrl, data) {
    try {
        // write file to disk
        fs.writeFileSync(fileUrl, JSON.stringify(data), 'utf8');
    } catch (err) {
        console.log(`Error writing file: ${err}`);
    }
};

async function updateDNS(newIP) {
    // const options = {
    //     method: 'PUT',
    //     headers: {'Content-Type': 'application/json', 'X-Auth-Email': CLOUDFLARE_EMAIL, 'X-Auth-Key': CLOUDFLARE_KEY},
    //     body: '{"comment":"Domain verification record","content":"newIP","name":"example.com","proxied":false,"tags":["owner:dns-team"],"ttl":3600}'
    // };
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'X-Auth-Email': CLOUDFLARE_EMAIL, 'X-Auth-Key': CLOUDFLARE_KEY}
    };


    let cloudflareFetchReq = await fetch(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE}/dns_records`, options);
    let cloudflareFetchRes = await cloudflareFetchReq.json();
    console.log("cloudflareFetchRes", cloudflareFetchRes);

}



module.exports = {
    syncToCloudflare: async function () {
        console.log("syncToCloudflare");
        // for reading file 'oldIP.json'
        const fileUrl = './helper/oldIP.json';


        let [
            databases,
            getIPRes,
        ] = await Promise.all([
            readFileJSON(fileUrl),
            getIP(),
        ]);

        // print all databases
        console.log("databases", databases);

        if (getIPRes.status && getIPRes.status === 'success') {
            console.log("getIPRes", getIPRes);

        }


        if (databases.query != getIPRes.query) {
            writeFileJSON(fileUrl, getIPRes);
            updateDNS(getIPRes.query);

        } else {
            console.log("not write file");
        }
    }
};