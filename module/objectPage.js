var objectPage = function() {
    
    const viewName = "sap.suite.ui.generic.template.ObjectPage.view.Details";
    
    // Enter data field
    this.fillInFileds = async function(type, metadata, id, value, index) {
         if (type === "ID" ) {
            const selector = {
                "elementProperties": {
                  "viewName": viewName,
                  "metadata": `${metadata}`,
                  "id": `*${id}*`
                }   
            };
            await ui5.userInteraction.clearAndFill(selector, value, index); 

         } else if (type === "Combobox") {
            const selector = {
                "elementProperties": {
                  "viewName": viewName,
                  "metadata": `${metadata}`,
                  "id": `*${id}*`
                }   
            };
            await ui5.userInteraction.selectComboBox(selector, value, index); 
              
         } else if (type === "Item") {
            const selector = {
                "elementProperties": {
                    "viewName": viewName,
                    "metadata": `${metadata}`,
                    "bindingContextPath": `/C_PurchaseOrderItemTP*PurchaseOrder=''*PurchaseOrderItem='${index}'*`,
                    "value": [{
                        "path": `${id}`
                    }]
                }
            };
            await ui5.userInteraction.clearAndFill(selector, value);
         }
    };
    this.addItem = async function(metadata, id) {
     
         const selector = {
             "elementProperties": {
               "viewName": viewName,
               "metadata": `${metadata}`,
               "id": `*${id}*`
             }   
         };
           await ui5.userInteraction.click(selector);
    };
}

module.exports = new objectPage();