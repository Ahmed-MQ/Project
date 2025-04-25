document.addEventListener('DOMContentLoaded', function() {
    // Exchange rates (sample data - in real app fetch from API)
    const exchangeRates = {
        USD: 1,        // US Dollar
        EUR: 0.85,     // Euro
        GBP: 0.73,     // British Pound
        JPY: 110.15,   // Japanese Yen
        AUD: 1.35,     // Australian Dollar
        CAD: 1.25,     // Canadian Dollar
        CNY: 6.45,     // Chinese Yuan
        SAR: 3.75,     // Saudi Riyal
        AED: 3.67,     // UAE Dirham
        EGP: 15.70,    // Egyptian Pound
        IQD: 1450,     // Iraqi Dinar
        INR: 74.50,    // Indian Rupee
        RUB: 75.20,    // Russian Ruble
        TRY: 8.50,     // Turkish Lira
        BRL: 5.25,     // Brazilian Real
        ZAR: 14.75,    // South African Rand
        CHF: 0.92,     // Swiss Franc
        SEK: 8.65,     // Swedish Krona
        NOK: 8.85,     // Norwegian Krone
        DKK: 6.25,     // Danish Krone
        SGD: 1.35,     // Singapore Dollar
        MYR: 4.20,     // Malaysian Ringgit
        THB: 33.25,    // Thai Baht
        IDR: 14350,    // Indonesian Rupiah
        PKR: 165,      // Pakistani Rupee
        BHD: 0.38,     // Bahraini Dinar
        OMR: 0.38,     // Omani Rial
        QAR: 3.64,     // Qatari Riyal
        KWD: 0.30,     // Kuwaiti Dinar
        JOD: 0.71,     // Jordanian Dinar
        LBP: 1500,     // Lebanese Pound
        SYP: 1250      // Syrian Pound
    };

    // Currency encyclopedia data
    const currencyEncyclopedia = {
        USD: {
            name: "الدولار الأمريكي",
            facts: [
                "العملة الأكثر تداولاً في العالم",
                "يتم إنتاجه من قبل نظام الاحتياطي الفيدرالي الأمريكي",
                "يستخدم كعملة احتياطية عالمية في العديد من الدول",
                "ظهر لأول مرة في عام 1792"
            ]
        },
        EUR: {
            name: "اليورو",
            facts: [
                "العملة الرسمية للاتحاد الأوروبي",
                "يستخدمه 19 من أصل 27 دولة عضو في الاتحاد الأوروبي",
                "تم إدخاله في عام 1999 كعملة افتراضية وظهر نقداً في 2002",
                "ثاني أكبر عملة احتياطية في العالم"
            ]
        },
        IQD: {
            name: "الدينار العراقي",
            facts: [
                "العملة الرسمية للعراق منذ عام 1932",
                "ينقسم الدينار إلى 1000 فلس",
                "أصدرت أول عملة ورقية في عام 1931",
                "خضع الدينار العراقي لتغييرات كبيرة بعد حرب الخليج"
            ]
        },
        JPY: {
            name: "الين الياباني",
            facts: [
                "ثالث أكثر العملات تداولاً في سوق الصرف الأجنبي",
                "يتم إصداره من قبل بنك اليابان",
                "ظهر لأول مرة في عام 1871",
                "يُعرف برمز ¥"
            ]
        },
        GBP: {
            name: "الجنيه الإسترليني",
            facts: [
                "أقدم عملة لا تزال قيد الاستخدام",
                "يتم إصداره من قبل بنك إنجلترا",
                "يُعرف باسم 'الكابل' في أسواق الفوركس",
                "ظهر لأول مرة في القرن الثامن"
            ]
        }
    };

    // Currency to countries mapping
    const currencyCountries = {
        USD: ["الولايات المتحدة", "الإكوادور", "السلفادور", "جزر مارشال", "ميكرونيزيا", "بالاو", "بنما", "تيمور الشرقية", "زيمبابوي"],
        EUR: ["ألمانيا", "فرنسا", "إيطاليا", "إسبانيا", "هولندا", "بلجيكا", "النمسا", "اليونان", "البرتغال", "فنلندا", "أيرلندا", "سلوفاكيا", "سلوفينيا", "إستونيا", "لاتفيا", "ليتوانيا", "قبرص", "مالطا", "لوكسمبورغ"],
        IQD: ["العراق"],
        GBP: ["المملكة المتحدة", "جبل طارق", "غيرنزي", "جزيرة مان", "جيرسي"],
        JPY: ["اليابان"],
        AUD: ["أستراليا", "كيريباتي", "ناورو", "توفالو"],
        CAD: ["كندا"],
        CNY: ["الصين"],
        SAR: ["المملكة العربية السعودية"],
        AED: ["الإمارات العربية المتحدة"],
        EGP: ["مصر"],
        INR: ["الهند", "بوتان"],
        RUB: ["روسيا"],
        TRY: ["تركيا"],
        BRL: ["البرازيل"],
        ZAR: ["جنوب أفريقيا"],
        CHF: ["سويسرا", "ليختنشتاين"],
        SEK: ["السويد"],
        NOK: ["النرويج"],
        DKK: ["الدنمارك", "جرينلاند", "جزر فارو"],
        SGD: ["سنغافورة"],
        MYR: ["ماليزيا"],
        THB: ["تايلاند"],
        IDR: ["إندونيسيا"],
        PKR: ["باكستان"],
        BHD: ["البحرين"],
        OMR: ["عمان"],
        QAR: ["قطر"],
        KWD: ["الكويت"],
        JOD: ["الأردن"],
        LBP: ["لبنان"],
        SYP: ["سوريا"]
    };

    // DOM Elements
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const resultDiv = document.getElementById('result');
    const ratesTable = document.getElementById('rates-table');
    const encyclopediaContent = document.getElementById('encyclopedia-content');
    const currencySelect = document.getElementById('currency-select');
    const findCountriesBtn = document.getElementById('find-countries-btn');
    const countriesResult = document.getElementById('countries-result');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    // Initialize currency dropdowns
    function initCurrencyDropdowns() {
        for (const currency in exchangeRates) {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = `${getCurrencyName(currency)} (${currency})`;
            fromCurrencySelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = `${getCurrencyName(currency)} (${currency})`;
            toCurrencySelect.appendChild(option2);
            
            const option3 = document.createElement('option');
            option3.value = currency;
            option3.textContent = `${getCurrencyName(currency)} (${currency})`;
            currencySelect.appendChild(option3);
        }
        
        // Set default values
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
    }

    // Initialize the rates table
    function initRatesTable() {
        let tableHTML = '<table><tr><th>العملة</th><th>السعر مقابل الدولار</th></tr>';
        
        for (const currency in exchangeRates) {
            tableHTML += `<tr><td>${getCurrencyName(currency)} (${currency})</td><td>${exchangeRates[currency]}</td></tr>`;
        }
        
        tableHTML += '</table>';
        ratesTable.innerHTML = tableHTML;
    }

    // Initialize encyclopedia
    function initEncyclopedia() {
        let contentHTML = '';
        
        for (const currency in currencyEncyclopedia) {
            contentHTML += `
                <div class="currency-info">
                    <h3>${currencyEncyclopedia[currency].name} (${currency})</h3>
                    <ul>
                        ${currencyEncyclopedia[currency].facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        encyclopediaContent.innerHTML = contentHTML;
    }

    // Get currency name in Arabic
    function getCurrencyName(code) {
        const names = {
            USD: 'دولار أمريكي',
            EUR: 'يورو',
            GBP: 'جنيه إسترليني',
            JPY: 'ين ياباني',
            AUD: 'دولار أسترالي',
            CAD: 'دولار كندي',
            CNY: 'يوان صيني',
            SAR: 'ريال سعودي',
            AED: 'درهم إماراتي',
            EGP: 'جنيه مصري',
            IQD: 'دينار عراقي',
            INR: 'روبية هندية',
            RUB: 'روبل روسي',
            TRY: 'ليرة تركية',
            BRL: 'ريال برازيلي',
            ZAR: 'راند جنوب أفريقي',
            CHF: 'فرنك سويسري',
            SEK: 'كرونة سويدية',
            NOK: 'كرونة نرويجية',
            DKK: 'كرونة دنماركية',
            SGD: 'دولار سنغافوري',
            MYR: 'رينغيت ماليزي',
            THB: 'باهت تايلاندي',
            IDR: 'روبية إندونيسية',
            PKR: 'روبية باكستانية',
            BHD: 'دينار بحريني',
            OMR: 'ريال عماني',
            QAR: 'ريال قطري',
            KWD: 'دينار كويتي',
            JOD: 'دينار أردني',
            LBP: 'ليرة لبنانية',
            SYP: 'ليرة سورية'
        };
        return names[code] || code;
    }

    // Convert currency
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            resultDiv.textContent = 'الرجاء إدخال مبلغ صحيح';
            return;
        }

        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // Convert to USD first, then to target currency
        const amountInUSD = amount / exchangeRates[fromCurrency];
        const convertedAmount = amountInUSD * exchangeRates[toCurrency];

        resultDiv.innerHTML = `
            ${amount.toFixed(2)} ${getCurrencyName(fromCurrency)} = 
            ${convertedAmount.toFixed(2)} ${getCurrencyName(toCurrency)}
        `;
    }

    // Find countries using selected currency
    function findCountries() {
        const currency = currencySelect.value;
        const countries = currencyCountries[currency] || [];
        
        if (countries.length === 0) {
            countriesResult.innerHTML = `<p>لا توجد معلومات عن الدول التي تستخدم ${getCurrencyName(currency)}</p>`;
            return;
        }
        
        let countriesHTML = `
            <h3>الدول التي تستخدم ${getCurrencyName(currency)} (${currency}):</h3>
            <div class="country-list">
                ${countries.map(country => `<div class="country-item">${country}</div>`).join('')}
            </div>
        `;
        
        countriesResult.innerHTML = countriesHTML;
    }

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Event Listeners
    convertBtn.addEventListener('click', convertCurrency);
    findCountriesBtn.addEventListener('click', findCountries);
    scrollTopBtn.addEventListener('click', scrollToTop);

    // Initialize the page
    initCurrencyDropdowns();
    initRatesTable();
    initEncyclopedia();
});