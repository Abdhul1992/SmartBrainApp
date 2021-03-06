import Clarifai from "clarifai";
const app = new Clarifai.App({
  apiKey: "5b11f208b2cc4f51af31d88d12ed7b80",
});
export const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};

export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      console.log(entries);
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};
