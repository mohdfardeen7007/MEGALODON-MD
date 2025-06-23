const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "tagall",
    react: "📑",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs.*");
        
        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*");
        }

        // Ensure group metadata is fetched properly
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['━﹝̣ׄ🩰̸̶ּׄ͜﹞', '🧭ᩨ─', '━ ✦ ⃞🌖', '﹙𐇵̸̶﹚───', '━ ✦ ⃞🏴‍☠️‌'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Proper message extraction
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "𝐖α𝗄𝖾 𝐔ρ 𝐄𝗏𝖾𝗋𝗒ⱺ𐓣𝖾"; // Default message

        let teks = `*𝐆𝗋𖹭ׁ𝗎𝗉: ${groupName}*\n*𝐌𝖾𝗆𝖻𝖾𝗋: ${totalMembers}*\n*𝐌𝖾𝗌𝗌𝖺𝗀𝖾: ${message}*\n\n*(▇▇) 💮 ̸̷̶   ٘ 〔 𝐓𝖺𝗀𝗅𝕚͜𝗌𝗍 〕 ‏‏‎‎╼──╮*\n`;

        for (let mem of participants) {
            if (!mem.id) continue; // Prevent undefined errors
            teks += `*${randomEmoji}* @${mem.id.split('@')[0]}\n`;
        }
