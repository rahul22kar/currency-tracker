describe("Currency Details Page", () => {
  beforeEach(() => {
    // Navigate to a specific currency details page
    cy.visit("http://localhost:3000/details/bitcoin"); // Assuming 'bitcoin' is a valid assetId
  });

  it("should display the currency name and symbol", () => {
    cy.contains("Bitcoin (BTC) Details");
  });

  it("should display the rank, price, and market cap", () => {
    cy.get(".ant-card").contains("Rank");
    cy.get(".ant-card").contains("Price (USD)");
    cy.get(".ant-card").contains("Market Cap (USD)");
  });

  it("should display the change in 24 hrs and volume", () => {
    cy.get(".ant-card").contains("Change in 24 Hrs");
    cy.get(".ant-card").contains("Volume (24Hrs)");
  });

  it("should display the total supply", () => {
    cy.get(".ant-card").contains("Total supply");
  });

  it("should display the price trend chart", () => {
    cy.get(".ant-card").contains("Last 30 days price trend");
    cy.get("canvas").should("exist"); //Chart renders on a canvas
  });

  it("should toggle favourite status", () => {
    cy.get("span.star-outlined").click();
    cy.reload();
    cy.get("span.star-filled").should("exist");
    cy.get("span.star-filled").click();
    cy.reload();
    cy.get("span.star-outlined").should("exist");
  });

  it("should display error message on data load failure", () => {
    // Simulate a failure scenario
    cy.intercept("GET", "https://api.coincap.io/v2/assets/bitcoin", {
      statusCode: 500,
    });
    cy.reload();
    cy.contains("Failed to load currency details");
  });
});
