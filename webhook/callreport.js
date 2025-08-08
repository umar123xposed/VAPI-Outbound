import express from "express"
const router = express.Router()

router.post("/vapi/webhook", (req, res) => {
    const event = req.body;
    console.log("📞 VAPI Webhook Event:", event);

    // Example: When call ends
    if (event.type === "call.ended") {
        console.log("✅ Call ended. Report:", event.data);
        // Save event.data to DB
    }

    res.sendStatus(200);
});

export default router;