const http = require("https");

const data = JSON.stringify({
  "transaction_id": "1197_257740",
  "id_professional_company": 1197,
  "id_professional_agenda": null,
  "id_professional_prestation": 9158,
  "id_professional_place": [1747, 1749],
  "source_type": "widget",
  "duration": 7,
  "number_slots": 1,
  "display_time_slots_as_range": false,
  "additional_informations_start": [{
    "id": 17457,
    "type": "radio",
    "duration": 0,
    "breadcrumb": "Hôtel administratif "
  }, { "id": 17285, "type": "nbpers", "duration": 0, "breadcrumb": "1 personne" }, {
    "id": 20739,
    "type": "radio",
    "duration": -5,
    "breadcrumb": "Avec pré-demande "
  }]
});

const req = http.request("https://ws.synbird.com/v6/pro/company/getSlotsFor", {
  method: "POST",
  headers: {
    Accept: "application/json, text/plain, */*", "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
    "Referer": "https://www.vivre-a-niort.com/",
    "Content-Type": "application/json",
    "Origin": "https://www.vivre-a-niort.com",
    "DNT": 1,
    "Connection": "keep-alive",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "Sec-GPC": 1
  }

}, res => {
  let data = "";
  res.on("data", function(chunk) {
    data += chunk;
  })
    .on("end", function() {
      const json = JSON.parse(data);
      if (json.timeSlots.length !== 0) {
        process.exit(-1);
      }
      process.exit(0);
    });
});

req.write(data);
req.end();
