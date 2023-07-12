require('dotenv').config();
var objectPage = require("../module/objectPage.js");
var elementsData = require("../data/elementsData.json");
var standardZPO = require("../data/standardZPO.json");

describe("Create a new Purchase Order", function() {

    it("Step 01: Open the system and navigate to the Purchase Order app", async function() {
      await ui5.navigation.navigateToApplication("PurchaseOrder-manage")
    });
  
    it("Step 02: App login", async function() {
      await ui5.session.login(process.env.USER, process.env.PASSWORD);
      
    });
  
    it("Step 03: Click Create on the List report page", async function() {
      const selector = {
        "elementProperties": {
          "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
          "metadata": "sap.m.Button",
          "id": "*addEntry"
        }   
      };
      await ui5.userInteraction.click(selector);
    });

    it("Step 04: Select Purchase Order Type - Standard Z-PO (ZNB)", async function() {
       await objectPage.fillInFileds(
             elementsData.combobox.purchaseOrderType.type, 
             elementsData.combobox.purchaseOrderType.metadata,
             elementsData.combobox.purchaseOrderType.id,
             standardZPO.generalInformation.purchaseOrderType
       );
    });

   it("Step 05: Choose Supplier - 50000040", async function() {
      await objectPage.fillInFileds(
            elementsData.field.supplier.type,
            elementsData.field.supplier.metadata,
            elementsData.field.supplier.id,
            standardZPO.generalInformation.supplier
      );
      await common.userInteraction.pressEnter();
   });

   it("Step 06: Choose Currency - EUR", async function() {
      await objectPage.fillInFileds(
            elementsData.field.currency.type,
            elementsData.field.currency.metadata,
            elementsData.field.currency.id,
            standardZPO.generalInformation.currency
      );
      await common.userInteraction.pressEnter();
   });

  it("Step 07: Purchasing Group - 001", async function() {
      await objectPage.fillInFileds(
           elementsData.field.purchasingGroup.type,
           elementsData.field.purchasingGroup.metadata,
           elementsData.field.purchasingGroup.id,
           standardZPO.generalInformation.purchasingGroup
      );
      await common.userInteraction.pressEnter();
  });

  it("Step 08: Purchasing Organization - 1010", async function() {
      await objectPage.fillInFileds(
           elementsData.field.purchasingOrganization.type,
           elementsData.field.purchasingOrganization.metadata,
           elementsData.field.purchasingOrganization.id,
           standardZPO.generalInformation.purchasingOrganization
      );
      await common.userInteraction.pressEnter();
  });

  it("Step 09: Company Code - 1010", async function() {
      await objectPage.fillInFileds(
            elementsData.field.companyCode.type,
            elementsData.field.companyCode.metadata,
            elementsData.field.companyCode.id,
            standardZPO.generalInformation.companyCode
      );
      await common.userInteraction.pressEnter();
  });

  it("Step 10: Navigate to the Items tab", async function() {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.m.Button",
        "id": "*objectPage-anchBar-ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--ItemsFacet::Section-anchor"
      }   
    };
     await ui5.userInteraction.click(selector);
     });

  var itemArr = standardZPO.items
  for (let [itemIndex, itemValue] of itemArr.entries()) {

    it ("Item" + itemValue.item + "Add Purchase Order Item", async function() { 
        await objectPage.addItem (
              elementsData.button.createNewItem.metadata,
              elementsData.button.createNewItem.id
        );      
       });

    it ("Item" + itemValue.item + "Select Item Category" + itemValue.itemCategory, async function() { 
        await objectPage.fillInFileds(
              elementsData.field.itemCategory.type,
              elementsData.field.itemCategory.metadata,
              elementsData.field.itemCategory.path,
              itemValue.itemCategory,
              itemValue.item
        );
    });

    it ("Item" + itemValue.item + "Choose Material" + itemValue.Material, async function() { 
        await objectPage.fillInFileds(
              elementsData.field.itemMaterial.type,
              elementsData.field.itemMaterial.metadata,
              elementsData.field.itemMaterial.path,
              itemValue.Material,
              itemValue.item
        );
    });

    it ("Item" + itemValue.item + "Fill in Quantity" + itemValue.orderQuantity, async function() { 
        await objectPage.fillInFileds(
              elementsData.field.itemQuantity.type,
              elementsData.field.itemQuantity.metadata,
              elementsData.field.itemQuantity.path,
              itemValue.orderQuantity,
              itemValue.item
        );
    });
  }

  it("Step 11: Create Document - Click Create button", async function() {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.m.Button",
        "id": "*activate"
      }   
    };
    await common.userInteraction.pressEnter();
    await ui5.userInteraction.click(selector);
  });  
  
  it("Step 12: Get newly created PO ID", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.m.Title",
        "id": "*template::ObjectPage::ObjectPageDynamicHeaderTitle"
      }   
    };
    const purchaseOrderID = await ui5.element.getPropertyValue(selector, "text");;
    util.console.log(purchaseOrderID);
    const userData = {
      "purchaseOrderNumber": purchaseOrderID
    };
       browser.config.params.export.purchaseOrderID = userData;

    const references = browser.config.params.import.data["references"];
    references.purchaseOrderNumber = purchaseOrderID; 
    
  });
  
  it("Step 13: Logging Off", async function () {
      await ui5.session.logout();
    })});