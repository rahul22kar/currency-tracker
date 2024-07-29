describe("Currency Listing Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the title", () => {
    cy.contains("Top 100 Crypto Currencies");
  });

  it("should display the table with correct columns", () => {
    cy.get("thead").within(() => {
      cy.contains("Symbol");
      cy.contains("Name");
      cy.contains("Price (USD)");
      cy.contains("Market Cap (USD)");
      cy.contains("Favourite");
    });
  });

  it("should sort by symbol", () => {
    cy.get("thead").contains("Symbol").click();
    cy.get("tbody tr").eq(1).contains("1INCH"); // 1INCH comes first when sorted by symbol
  });

  it("should sort by name", () => {
    cy.get("thead").contains("Name").click();
    cy.get("tbody tr").eq(1).contains("ZRX"); // ZRX comes first when sorted by name
  });

  it("should navigate to details page when a currency name is clicked", () => {
    cy.get("tbody tr")
      .eq(1)
      .within(() => {
        cy.get("a").click();
      });
    cy.url().should("include", "/details/");
  });

  it("should display error message on data load failure", () => {
    // Simulate a failure scenario
    cy.intercept("GET", "https://api.coincap.io/v2/assets", {
      statusCode: 500,
    });
    cy.reload();
    cy.contains("Failed to load data!");
  });

  it("should toggle favourite status", () => {
    cy.get("tbody tr")
      .eq(1)
      .within(() => {
        cy.get("span.star-outlined").click();
      });
    cy.reload();
    cy.get("tbody tr")
      .eq(1)
      .within(() => {
        cy.get("span.star-filled").should("exist");
        cy.get("span.star-filled").click();
      });
    cy.reload();
    cy.get("tbody tr")
      .eq(1)
      .within(() => {
        cy.get("span.star-outlined").should("exist");
      });
  });
});
