const { test, expect } = require("@playwright/test");

test.describe.serial("Test Favorite Airports on test API", () => {
  const USER = {
    token: "i6D129vkuYbbYpzxffafu9CP",
  };

  let first_airport_id: string;
  let second_airport_id: string;
  const log_enabled = false;

  test("GET Check existing Airports", async ({ request }) => {
    const res = await request.get("https://airportgap.com/api/airports", {
      headers: {
        Authorization: `Bearer ${USER.token}`,
        "Content-Type": "application/json",
      },
    });
    expect(res.status()).toBe(200);
    const response_data = await res.json();
    first_airport_id = response_data.data[0].id;
    second_airport_id = response_data.data[1].id;
    if (log_enabled) {
      console.log("Existing Airports data JSON:", response_data);
      console.log("First Airport ID:", first_airport_id);
      console.log("Second Airport ID:", second_airport_id);
    }
  });

  test("POST Add First Airport to the favorites", async ({ request }) => {
    const res = await request.post("https://airportgap.com/api/favorites", {
      headers: {
        Authorization: `Bearer ${USER.token}`,
        "Content-Type": "application/json",
      },
      data: {
        airport_id: first_airport_id,
        note: "My usual layover when visiting family",
      },
    });
    expect(res.status()).toBe(201);
    const response_data = await res.json();
    if (log_enabled) {
      console.log(
        "The first Airport added to the Favorites - data JSON:",
        response_data
      );
    }
  });

  test("POST Add Second Airport to the favorites", async ({ request }) => {
    const res = await request.post("https://airportgap.com/api/favorites", {
      headers: {
        Authorization: `Bearer ${USER.token}`,
        "Content-Type": "application/json",
      },
      data: {
        airport_id: second_airport_id,
        note: "My usual layover when visiting family",
      },
    });
    expect(res.status()).toBe(201);
    const response_data = await res.json();
    if (log_enabled) {
      console.log(
        "The first Airport added to the Favorites - data JSON:",
        response_data
      );
    }
  });

  test("GET Check Added Airports", async ({ request }) => {
    const res = await request.get("https://airportgap.com/api/favorites", {
      headers: {
        Authorization: `Bearer ${USER.token}`,
        "Content-Type": "application/json",
      },
    });
    expect(res.status()).toBe(200);
    const response_data = await res.json();
    // check the corect Airports iata codes in favorites
    expect(response_data.data[0].attributes.airport.iata).toBe(
      first_airport_id
    );
    expect(response_data.data[1].attributes.airport.iata).toBe(
      second_airport_id
    );
    if (log_enabled) {
      console.log("Favorites Airports data JSON:", response_data);
      console.log(
        "First Airport iata:",
        response_data.data[0].attributes.airport.iata
      );
      console.log(
        "Second Airport iata:",
        response_data.data[1].attributes.airport.iata
      );
    }
  });

  test("DELETE Delete Favorites Airports", async ({ request }) => {
    const res = await request.delete(
      "https://airportgap.com/api/favorites/clear_all",
      {
        headers: {
          Authorization: `Bearer ${USER.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(res.status()).toBe(204);
  });

  test("GET Check and validate if favorites airports are deleted", async ({
    request,
  }) => {
    const res = await request.get("https://airportgap.com/api/favorites", {
      headers: {
        Authorization: `Bearer ${USER.token}`,
        "Content-Type": "application/json",
      },
    });
    expect(res.status()).toBe(200);
    const response_data = await res.json();
    // check if favorites airports are deleted
    expect(response_data.data).toStrictEqual([]);

    if (log_enabled) {
      console.log("Favorites Airports data JSON:", response_data);
    }
  });
});
