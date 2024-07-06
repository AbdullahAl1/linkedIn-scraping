const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless: true to run in the background
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  page.setDefaultNavigationTimeout(60000); // Set a higher timeout in case of slow network

  // Navigate to LinkedIn and log in
  await page.goto('https://www.linkedin.com/jobs/search/?currentJobId=3918199939&keywords=mlops');

  function waitUntil(t){
    return new Promise((r)=>{
        setTimeout(r,t)
    })
}

  page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await waitUntil(2000)

  page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await waitUntil(2000)

  page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await waitUntil(2000)

  page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await waitUntil(2000)

  page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await waitUntil(2000)

  page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await waitUntil(2000)

  page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

// 120 results

  // Wait for the results to load
  await page.waitForSelector('.base-card', { visible: true });

  async function scrollPageToBottom() {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    // Adjust the timeout values
    await page.waitForTimeout(500);
  }


  // Extract job descriptions
  const jobDescriptions = await page.evaluate(() => {
    const jobCards = document.querySelectorAll('.two-pane-serp-page__results-list li');
    const descriptions = [];
    jobCards.forEach(card => {
        setTimeout(()=>{},1000)
      const jobTitle = card.querySelector('a')?.innerText || 'No title';
      const jobId = card.querySelector('a')?.href || 'No link';

      const job = card.querySelector('a').click()
      let jobDescription = ""
      setTimeout(()=>{
        jobDescription = document.querySelector('.show-more-less-html__markup').innerHTML;
      },2000)
      descriptions.push({
        jobTitle,jobDescription,jobId
      });
    });
    window.scrollBy(0, window.innerHeight);
    return descriptions;
  });

  console.log(jobDescriptions);
  let desc = []
  jobDescriptions.forEach(async (job)=>{
    const jobPage =  await browser.newPage();
    try{
      await jobPage.goto(job.jobId, { waitUntil: 'networkidle2' });
      setTimeout(async ()=>{
        const jobDescription = await jobPage.evaluate(() => {
          let v = document.querySelector(".show-more-less-html__markup").innerText;
          desc.push(v)
         })
      },5000)
    }catch (e){

    }
    
  })
  console.log(desc);
  //   await browser.close();
})();

// console.log(job.jobId);
// const browser = puppeteer.launch();
// const page = browser.newPage();
// page.goto(`${job.jobId}`);
