var Config = {

    default: {
        isPluginEnabled: true,
        apiKey: "YOUR_API_KEY",
        valute: "RUB",
        email: null,
        autoSubmitForms: true,
        submitFormsDelay: 5,
        enabledForNormal: false,
        enabledForRecaptchaV2: true,
        enabledForInvisibleRecaptchaV2: true,
        enabledForRecaptchaV3: true,
        enabledForHCaptcha: true,
        enabledForGeetest: false,
        enabledForGeetest_v4: false,
        enabledForKeycaptcha: false,
        enabledForArkoselabs: false,
        enabledForLemin: false,
        enabledForYandex: false,
        autoSolveNormal: true,
        autoSolveRecaptchaV2: true,
        autoSolveInvisibleRecaptchaV2: true,
        autoSolveRecaptchaV3: false,
        recaptchaV3MinScore: 0.5,
        autoSolveHCaptcha: true,
        autoSolveGeetest: false,
        autoSolveKeycaptcha: false,
        autoSolveArkoselabs: false,
        autoSolveGeetest_v4: false,
        autoSolveLemin: false,
        autoSolveYandex: false,
        repeatOnErrorTimes: 2,
        repeatOnErrorDelay: 2,
        useProxy: false,
        proxytype: "HTTP",
        proxy: "",
        normalSources: [],
        autoSubmitRules: [{
            url_pattern: "goodxevilpay.shop/demo",
            code: "" +
                '{"type":"source","value":"document"}' + "\n" +
                '{"type":"method","value":"querySelector","args":["button[type=submit]"]}' + "\n" +
                '{"type":"method","value":"click"}',
        }],
    },

    get: async function (key) {
        let config = await this.getAll();
        return config[key];
    },

    getAll: function () {
        return new Promise(function(resolve, reject) {
            chrome.storage.local.get('config', function (result) {
                resolve(Config.joinObjects(Config.default, result.config));
            });
        });
    },

    set: function (newData) {
        return new Promise(function(resolve, reject) {
            Config.getAll()
                .then(data => {
                    chrome.storage.local.set({
                        config: Config.joinObjects(data, newData)
                    }, function (config) {
                        resolve(config);
                    });
                });
        });
    },

    joinObjects: function (obj1, obj2) {
        let res = {};
        for (let key in obj1) res[key] = obj1[key];
        for (let key in obj2) res[key] = obj2[key];
        return res;
    },

};
