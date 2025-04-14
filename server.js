const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();  // Khai báo biến app
const PORT = 3000;

// Cho phép cross-origin requests
app.use(cors());

// Phục vụ các file tĩnh từ thư mục hiện tại
// Phục vụ các file tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON requests
app.use(express.json());

// Route chính để phục vụ trang thanh toán
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Thanh-Toan-Hoc-Phi.html'));
});

// Tạo một API mẫu để mô phỏng API thực tế
app.post('/mock-api/GetData', (req, res) => {
    console.log('Nhận yêu cầu API với dữ liệu:', req.body);

    // Kiểm tra headers xác thực
    const authHeader = req.headers['authorization'];
    const nonceHeader = req.headers['nonce'];

    console.log('Authorization Header:', authHeader);
    console.log('Nonce Header:', nonceHeader);

    // Trả về dữ liệu mẫu
    const sampleData = {
        "success": true,
        "err_num": 0,
        "messages": "SUCCESS",
        "data": {
            "Customer": {
                "ma_kh": "10000521",
                "ten_kh": "Huỳnh Minh Quân (03/08/2018)",
                "ma_dvcs": "DV00",
                "ma_truong": "BAS.000",
                "ten_truong": "Mầm non - CƠ SỞ BÌNH AN",
                "ma_lop": "1L",
                "ten_lop": "Lớp 1 QT"
            },
            "Payment": [
                {
                    "stt_rec": req.body.stt_rec || "A000312474HD8",
                    "ngay_ct": "2025-04-09 00:00:00",
                    "loai_ct": "1",
                    "ma_lop": "1L",
                    "ten_lop": "Lớp 1 QT",
                    "t_tien_phi": 120750000.0,
                    "t_tien_ck": -2000000.0,
                    "t_tt": 118750000.0,
                    "ma_nt": "VND",
                    "dien_giai": "",
                    "thong_tin_chinh_sach": "",
                    "detail": [
                        {
                            "stt_rec0": "001",
                            "ma_phi": "AU0001",
                            "ten_phi": "Phí dịch vụ ăn uống Năm",
                            "tien_phi": 30000000.0,
                            "ma_cs": "",
                            "loai": 0
                        },
                        {
                            "stt_rec0": "002",
                            "ma_phi": "HP0001",
                            "ten_phi": "Học phí Năm",
                            "tien_phi": 90000000.0,
                            "ma_cs": "",
                            "loai": 0
                        },
                        {
                            "stt_rec0": "003",
                            "ma_phi": "PA0001",
                            "ten_phi": "Bảo hiểm y tế",
                            "tien_phi": 350000.0,
                            "ma_cs": "",
                            "loai": 0
                        },
                        {
                            "stt_rec0": "004",
                            "ma_phi": "PY0003",
                            "ten_phi": "Bảo hiểm y tế năm",
                            "tien_phi": 400000.0,
                            "ma_cs": "",
                            "loai": 0
                        },
                        {
                            "stt_rec0": "",
                            "ma_phi": "HP0001",
                            "ten_phi": "Chiết khấu chương trình - Voucher (Học phí Năm)",
                            "tien_phi": -2000000.0,
                            "ma_cs": "",
                            "loai": 2
                        }
                    ]
                }
            ]
        },
        "accountNo": "PATHWAYA000312474HD8",
        "qRStream": "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",
    };

    res.json(sampleData);
});

// Thêm API xác nhận thanh toán
app.post('/mock-api/ConfirmPayment', (req, res) => {
    console.log('Nhận yêu cầu xác nhận thanh toán:', req.body);

    // Kiểm tra headers xác thực
    const authHeader = req.headers['authorization'];
    const nonceHeader = req.headers['nonce'];

    console.log('Authorization Header:', authHeader);
    console.log('Nonce Header:', nonceHeader);

    // Giả lập xử lý và trả về phản hồi
    const confirmationCode = 'TT' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    res.json({
        success: true,
        messages: "Xác nhận thanh toán thành công",
        confirmationCode: confirmationCode,
        timestamp: new Date().toISOString()
    });
});

// Cho Vercel
if (process.env.NODE_ENV === 'production') {
    module.exports = app;
}

// Khởi động máy chủ
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log(`Để xem trang thanh toán học phí, truy cập: http://localhost:${PORT}?stt_rec=A000312474HD8`);
});