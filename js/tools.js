// 複利試算（初始本金 + 每月投入）
function calulate(start_money, month_totle, interest_rate, years) {
    // 轉成數字（避免字串相加）
    start_money   = Number(start_money);
    month_totle   = Number(month_totle);
    interest_rate = Number(interest_rate);
    years         = Number(years);

    // 年利率 (r)、月利率 (i)
    const r = interest_rate / 100; 
    const i = r / 12;             

    // 投資總月數
    const n = years * 12;

    // 本金複利
    const fv_start = start_money * (1 + r) ** years;

    // 每月投入複利
    const fv_month = month_totle * ((1 + i) ** n - 1) / i;

    // 總額
    return fv_start + fv_month;
}
