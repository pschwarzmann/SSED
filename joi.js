const Joi = require("joi");

const schema = Joi.object({
    info: Joi.object({
        erstellt: Joi.date().iso().required(),
        verein: Joi.string().required(),
        ipaddresse: Joi.string().ip({ version: "ipv4" }).required(),
    }).required(),
    anmeldung: Joi.object({
        Anrede: Joi.string().required(),
        Familienname: Joi.string().required(),
        Vorname: Joi.string().required(),
        Strasse: Joi.string().required(),
        Plz: Joi.string().required(),
        Ort: Joi.string().required(),
        Land: Joi.string().required(),
        Telefon: Joi.string().allow(""),
        Telefax: Joi.string().allow(""),
        "Mail-Adresse": Joi.string().email().allow(""),
    }).required(),
    teilnehmer: Joi.array()
        .items(
            Joi.object({
                Nachname: Joi.string().required(),
                Vorname: Joi.string().required(),
                Altersklasse: Joi.string().required(),
                Klasse: Joi.string().required(),
                Startzeit: Joi.string().required(),
            })
        )
        .required(),
});

const data = {
    info: {
        erstellt: "2016-11-29",
        verein: "BSC Weisnicht",
        ipaddresse: "192.128.2.1",
    },
    anmeldung: {
        Anrede: "Herr",
        Familienname: "Schwärzler",
        Vorname: "Markus",
        Strasse: "Joe-Street 5",
        Plz: "6850",
        Ort: "Dornbirn",
        Land: "Österreich",
    },
    teilnehmer: [
        { Nachname: "Maier", Vorname: "Joe", Altersklasse: "SCH", Klasse: "LB", Startzeit: "Vormittag" },
        { Nachname: "Maier", Vorname: "Marta", Altersklasse: "DAAK", Klasse: "LB", Startzeit: "Vormittag" },
    ],
};

const { error, value } = schema.validate(data);

if (!error) {
    console.log("Valid!");
} else {
    console.error("Invalid:", error.details);
}
