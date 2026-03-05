import ImageKit from "@imagekit/nodejs";

async function uploadFileIMGKIT(buffer){
    const client = new ImageKit({
        privateKey: process.env.IMGKIT_URI
    })

    const result = await client.files.upload({
        file : buffer.toString("base64"),
        fileName: "music_"+ Date.now(),
        folder: "spotify-backend/"
    })

    return result;
}


export default uploadFileIMGKIT;