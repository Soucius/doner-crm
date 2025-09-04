import ContactMessage from "../models/ContactMessage.js";

export async function getAllContactMessages(_, res) {
    try {
        const contactMessages = await ContactMessage.find().sort({ createdAt: -1 });

        res.status(200).json(contactMessages);
    } catch (error) {
        console.error("Error fetching contact messages: ", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createContactMessage(req, res) {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
        }

        const newContactMessage = new ContactMessage({
            name,
            email,
            message
        });

        await newContactMessage.save();

        res.status(201).json({ success: true, message: "Mesajınız başarıyla bize ulaştı. En kısa sürede geri dönüş yapacağız." });

    } catch (error) {
        console.error("Error creating contact message:", error);
        res.status(500).json({ success: false, message: "Mesaj gönderilirken bir hata oluştu." });
    }
}