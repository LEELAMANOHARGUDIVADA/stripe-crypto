import crypto from "crypto"

const generateKey = () => {
    const apiKey = crypto.randomBytes(32).toString("hex");
    return apiKey;
}

export default generateKey;