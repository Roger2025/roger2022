// 金額格式化
function moneyFormat(num) {
    return num.toLocaleString('zh-TW', { maximumFractionDigits: 0 });
}

// 主計算函式
function calulate(start_money, month_totle, interest_rate, years, mode, deposit_time) {

    start_money   = Number(start_money);
    month_totle   = Number(month_totle);
    interest_rate = Number(interest_rate);
    years         = Number(years);

    const r = interest_rate / 100; // 年利率
    const i = r / 12;              // 月利率
    const n = years * 12;

    let fv_start, fv_month;

    // ---------------------------
    // 年複利
    // ---------------------------
    if (mode === "year") {
        fv_start = start_money * (1 + r) ** years;

        if (deposit_time === "end") {
            // 期末投入
            fv_month = month_totle * 12 * ((1 + r) ** years - 1) / r;
        } else {
            // 期初投入（多滾一年）
            fv_month = month_totle * 12 * ((1 + r) ** years - 1) / r * (1 + r);
        }
    }

    // ---------------------------
    // 月複利
    // ---------------------------
    else {
        fv_start = start_money * (1 + i) ** n;

        if (deposit_time === "end") {
            fv_month = month_totle * ((1 + i) ** n - 1) / i;
        } else {
            fv_month = month_totle * ((1 + i) ** n - 1) / i * (1 + i);
        }
    }

    return fv_start + fv_month;
}


// 前端計算邏輯
function calu() {
    const start_money   = document.querySelector('#start_money').value;
    const month_totle   = document.querySelector('#month_totle').value;
    const years         = document.querySelector('#years').value;
    const interest_rate = document.querySelector('#interest_rate').value;
    const mode          = document.querySelector('#compound_mode').value;
    const deposit_time  = document.querySelector('#deposit_time').value;

    let total = calulate(start_money, month_totle, interest_rate, years, mode, deposit_time);
    let invest_total = Number(start_money) + Number(month_totle) * years * 12;

    document.querySelector('#result').innerHTML = `
        <p>最終金額：<b>${moneyFormat(total)} 元</b></p>
        <p>總投入：${moneyFormat(invest_total)} 元</p>
        <p>總收益：${moneyFormat(total - invest_total)} 元</p>
        <p>ROI 報酬率：${((total / invest_total - 1) * 100).toFixed(2)} %</p>
    `;
}
