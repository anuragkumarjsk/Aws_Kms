var aws = require("aws-sdk");
var fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

function encrypt(buffer) {
  const kms = new aws.KMS({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    region:process.env.REGION,
  });
  return new Promise((resolve, reject) => {
    const params = {
      KeyId:process.env.KEY_ID,
      Plaintext: "my password is hash@1234", // The data to encrypt.
    };
    kms.encrypt(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.CiphertextBlob);
      }
    });
  });
}

encrypt(new Buffer.from("my password is tempel_@12", "utf-8")).then(
  (plaintext) => {
    console.log(plaintext);
    let tempstr = plaintext.toString("utf-8");
    fs.writeFile("plainbase64", tempstr, (e) => {
      console.log(e);
    });
    console.log(plaintext.toString("utf-8"));
  }
);
