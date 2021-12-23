var aws = require("aws-sdk");
var fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();


function decrypt(buffer) {
    const kms = new aws.KMS({
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY,
        region:process.env.REGION,
      });
  return new Promise((resolve, reject) => {
    const params = {
      CiphertextBlob: buffer, // The data to dencrypt.
    };
    kms.decrypt(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Plaintext);
      }
    });
  });
}

decrypt(new Buffer.from(buff)).then((plaintext) => {
  console.log("decrypted file is : ", Buffer.from(plaintext));
});
