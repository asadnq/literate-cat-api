"use strict";

const Env = use("Env");
const axios = require("axios");

const instance = axios.create({
  baseURL: Env.get("RAJA_ONGKIR_API_URL"),
  headers: {
    key: Env.get("RAJA_ONGKIR_API_KEY")
  }
});

class RajaOngkirController {
  async getProvince({ response }) {
    return instance
      .get("/province")
      .then(res => {
        return response.json({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async getCity({ response, request }) {
    const getRequest = request.get();
    const province_id = getRequest.province || "";
    return instance
      .get(`/city?province=${province_id}`)
      .then(res => {
        return response.json({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async getCost({ response, request }) {
    const { origin, destination, weight, courier } = request.post();

    const requestBody = {
      origin,
      destination,
      weight,
      courier
    };

    return instance
      .post("/cost", requestBody)
      .then(res => {
        return response.json({ data: res.data });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}

module.exports = RajaOngkirController;
