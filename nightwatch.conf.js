// http://nightwatchjs.org/gettingstarted#settings-file

const path = require("path");
const deepmerge = require("deepmerge");
const chromedriver = require("chromedriver");

// user may have not installed geckodriver
let geckodriver = {};
try {
    geckodriver = require("geckodriver");
} catch (e) {}

const userOptions = JSON.parse(process.env.VUE_NIGHTWATCH_USER_OPTIONS || "{}");
const useSelenium = false;
const startHeadless = process.env.START_HEADLESS || false;
const concurrentMode = process.env.VUE_NIGHTWATCH_CONCURRENT === "1";
const chromeArgs = ["--no-sandbox", "--disable-gpu"];
const geckoArgs = [];

if (startHeadless) {
    chromeArgs.push("--headless");
    geckoArgs.push("--headless");
}

const defaultSettings = {
    src_folders: ["src/tests/e2e/specs"],
    //output_folder: "src/tests/e2e/reports",
    //page_objects_path: "src/tests/e2e/page-objects",
    //custom_assertions_path: "src/tests/e2e/custom-assertions",
    //custom_commands_path: "src/tests/e2e/custom-commands",
    globals_path: path.resolve("src/tests/e2e/globals.js"),
    test_workers: concurrentMode,
    test_settings: {
        default: {
            detailed_output: !concurrentMode,
            launch_url: "${VUE_DEV_SERVER_URL}",
        },

        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
                chromeOptions: {
                    w3c: false,
                    args: chromeArgs,
                },
            },
        },

        firefox: {
            desiredCapabilities: {
                browserName: "firefox",
                alwaysMatch: {
                    acceptInsecureCerts: true,
                    "moz:firefoxOptions": {
                        args: geckoArgs,
                    },
                },
            },
            webdriver: useSelenium
                ? {}
                : {
                      server_path: geckodriver.path,
                      port: 4444,
                  },
        },
    },
};

const baseSettings = deepmerge(defaultSettings, webdriverServerSettings());

module.exports = deepmerge(baseSettings, adaptUserSettings(userOptions));

function adaptUserSettings(settings) {
    // The path to nightwatch external globals file needs to be made absolute
    // if it is supplied in an additional config file, due to merging of config files
    if (settings.globals_path) {
        settings.globals_path = path.resolve(settings.globals_path);
    }

    return settings;
}

function webdriverServerSettings() {
    if (useSelenium) {
        return {
            selenium: {
                start_process: true,
                host: "127.0.0.1",
                port: 4444,
                server_path: require("selenium-server").path,
                cli_args: {
                    "webdriver.chrome.driver": chromedriver.path,
                    "webdriver.gecko.driver": geckodriver.path,
                },
            },
        };
    }

    return {
        webdriver: {
            start_process: true,
            port: 9515,
            server_path: chromedriver.path,
        },
    };
}
