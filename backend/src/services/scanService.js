const Tesseract = require('tesseract.js');

/**
 * Service to handle OCR scanning of receipts
 */
class ScanService {
    /**
     * Process an image and extract transaction details
     * @param {string} imagePath - Path to the local image file
     * @returns {Promise<Object>} - { title, amount, date }
     */
    async scanReceipt(imagePath) {
        try {
            const { data: { text } } = await Tesseract.recognize(
                imagePath,
                'eng',
                { logger: m => console.log(m) }
            );

            return this.parseReceiptText(text);
        } catch (err) {
            console.error('OCR Error:', err);
            throw new Error('Failed to process image');
        }
    }

    /**
     * Primitive parser for receipt text
     * @param {string} text 
     */
    parseReceiptText(text) {
        const lines = text.split('\n');
        let title = 'New Receipt';
        let amount = 0;
        let date = new Date().toISOString().split('T')[0];

        // 1. Try to find merchant name (usually the first non-empty line)
        for (const line of lines) {
            if (line.trim().length > 3 && !line.includes('$') && !/\d/.test(line)) {
                title = line.trim();
                break;
            }
        }

        // 2. Try to find the total amount (look for patterns like "TOTAL", "TOTAL DUE", "$XX.XX")
        const amountRegex = /(\d+\.\d{2})/;
        const totalKeywords = ['TOTAL', 'TOTAL DUE', 'AMOUNT PAID', 'NET', 'BALANCE'];

        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].toUpperCase();
            if (totalKeywords.some(key => line.includes(key))) {
                const match = line.match(amountRegex);
                if (match) {
                    amount = parseFloat(match[1]);
                    break;
                }
            }
        }

        // 3. Fallback: Take the highest dollar value found
        if (amount === 0) {
            const matches = text.match(/(\d+\.\d{2})/g);
            if (matches) {
                const values = matches.map(m => parseFloat(m));
                amount = Math.max(...values);
            }
        }

        return { title, amount, date };
    }
}

module.exports = new ScanService();
