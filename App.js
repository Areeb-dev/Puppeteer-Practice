const puppeteer = require("puppeteer");
let arrayOfObject=[]
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
    await page.click(".close-btn", { clickcount: 1 });

    const secondPage = await browser.newPage();
    await secondPage.goto(
      "https://sam.gov/opp/3e6df8a240c949f8a6257cee851822c3/view"
    );
    await secondPage.click(".close-btn", { clickcount: 1 });

    try {
      const head = await secondPage.$eval(
        "#main-container > ng-component > page > div > div > div.page-content.row > div.nine.wide.column > div.usa-width-three-fourths.br-double-after.ng-star-inserted > h1",
        (el) => el.textContent
      );
      const id = await secondPage.$eval(
        "div > .description",
        (el) => el.textContent
      );
      const originalDate = await secondPage.$eval(
        "#general-original-response-date",
        (el) => el.textContent
      );
      const subCommand = await secondPage.$eval(
        "#header-hierarchy-level > div > div:nth-child(6)",
        (el) => el.textContent
      );
      const description = await secondPage.$eval(
        "#description > div.ng-star-inserted",
        (el) => el.textContent
      );
      const contractOpportunity = await secondPage.$eval(
        "#general-type",
        (el) => el.textContent
      );
      const department = await secondPage.$eval(
        "#header-hierarchy-level > div > div:nth-child(2)",
        (el) => el.textContent
      );
      const office = await secondPage.$eval(
        "#header-hierarchy-level > div > div:nth-child(12)",
        (el) => el.textContent
      );
      const NAICSCode = await secondPage.$eval(
        "#classification-naics-code > ul > li",
        (el) => el.textContent
      );
      const subTire = await secondPage.$eval(
        "#header-hierarchy-level > div > div:nth-child(4)",
        (el) => el.textContent
      );
      arrayOfObject.push({
        heading: head,
        id: id,
        originalDate: originalDate,
        subTire: subTire,
        department: department,
        contractOpportunity: contractOpportunity,
        office: office,
        subCommand: subCommand,
        NAICSCode: NAICSCode,
        description: description,
      });
      console.log(arrayOfObject);
    } catch (error) {
      console.log("ERROR", error);
    }
  } catch (error) {
    console.error(error);
  }
}

login();
