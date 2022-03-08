const puppeteer = require("puppeteer");
let arr = [];
let urls = [
  "https://sam.gov/opp/3e6df8a240c949f8a6257cee851822c3/view",
  "https://sam.gov/opp/3d28fb00e4cb4ae89adc8d00138ef830/view",
  "https://sam.gov/opp/2769922c5b194e3da0acf8c81feb6b8a/view",
];
async function login() {
  try {
    const URL =
      "https://sam.gov/search/?page=1&pageSize=25&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true&sfm%5BsimpleSearch%5D%5BkeywordRadio%5D=ALL&sfm%5BsimpleSearch%5D%5BkeywordTags%5D%5B0%5D%5Bkey%5D=rfi&sfm%5BsimpleSearch%5D%5BkeywordTags%5D%5B0%5D%5Bvalue%5D=rfi";
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    const page = await browser.newPage();

    await page.goto(URL);

    const secondPage = await browser.newPage();

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      await secondPage.goto(`${url}`, {
        waitUntil: ["networkidle2", "domcontentloaded"],
      });

      try {
        const main = await secondPage.evaluate(() => {
          let closebtn = document.querySelector(".close-btn");
          if (closebtn) {
            closebtn.click();
          }
          let header =
            document.querySelector(".sup.header")?.nextSibling?.textContent;
          let id = document.querySelector("div > .description")?.textContent;
          let originalDate = document.querySelector(
            "#general-original-response-date"
          )?.textContent;
          let subCommand = document.querySelector(
            "#header-hierarchy-level > div > div:nth-child(6)"
          )?.textContent;
          let description = document.querySelector(
            "#description > div.ng-star-inserted"
          )?.textContent;
          let contractOpportunity =
            document.querySelector("#general-type")?.textContent;
          let department = document.querySelector(
            "#header-hierarchy-level > div > div:nth-child(2)"
          )?.textContent;
          let NAICSCode = document.querySelector(
            "#classification-naics-code > ul > li"
          )?.textContent;
          let subTire = document.querySelector(
            "#header-hierarchy-level > div > div:nth-child(4)"
          )?.textContent;
          let upDatedDate = document.querySelector(
            "#general-response-date"
          )?.textContent;
          let updatedPublish = document.querySelector(
            "#general-published-date"
          )?.textContent;
          let upDatedDateOffer = document.querySelector(
            "#general-response-date"
          )?.textContent;
          let originalDateOffer = document.querySelector(
            "#general-original-response-date"
          )?.textContent;
          let productCode = document.querySelector(
            "#classification-classification-code"
          )?.textContent;
          return {
            header: header,
            id: id,
            originalDate: originalDate,
            upDatedDate: upDatedDate,
            updatedDatePublish: updatedPublish,
            upDatedDateOffer: upDatedDateOffer,
            originalDateOffer: originalDateOffer,
            subCommand: subCommand,
            contractOpportunity: contractOpportunity,
            department: department,
            productCode: productCode,
            NAICSCode: NAICSCode,
            subTire: subTire,
            description: description,
          };
        });
        arr.push(main)
        console.log("Array Of object",arr)
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

login();
