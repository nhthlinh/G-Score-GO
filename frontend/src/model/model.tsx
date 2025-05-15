type Score = {
    sbd: string;
    ma_ngoai_ngu: string;
    scores: {
        toan: number;
        ngu_van: number;
        ngoai_ngu: number;
        vat_li: number;
        hoa_hoc: number;
        sinh_hoc: number;
        lich_su: number;
        dia_li: number;
        gdcd: number;
    };
}

type Report = {
    subject: string;
    report: {
        "8+": number;
        "6-8": number;
        "4-6": number;
        "4-": number;
    }
}

type TopStudent = {
    sbd: string;
    ma_ngoai_ngu: string;
    toan: number;
    vat_li: number;
    hoa_hoc: number;
    tong_diem: number;
}

export type { Score, Report, TopStudent };