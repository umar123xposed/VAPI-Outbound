import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { parse as json2csv } from "json2csv";

const router = express.Router();

const CSV_PATH = path.join(process.cwd(), "leads.csv");

router.post("/webhook", (req, res) => {
    const event = req.body;
    console.log("📞 VAPI Webhook Event:", event);

    if (event.message.type === "end-of-call-report") {
        console.log("✅ Call ended. Report:", event.message);

        const phoneNumber = event.message?.call?.customer?.number; 
        const leadResult = event.message?.endedReason; 
        const summary = event.message?.analysis?.summary

        
        let leads = [];
        fs.createReadStream(CSV_PATH)
            .pipe(csv())
            .on("data", (row) => {
                leads.push(row);
            })
            .on("end", () => {
              
                leads = leads.map((lead) => {
                    if (lead.number === phoneNumber) {
                        return { ...lead, lead_result: leadResult , summary: summary };
                    }
                    return lead;
                });

               
                const updatedCSV = json2csv(leads);
                fs.writeFileSync(CSV_PATH, updatedCSV);

                console.log("✅ CSV updated for number:", phoneNumber);
            });
    }

    res.sendStatus(200);
});

export default router;
