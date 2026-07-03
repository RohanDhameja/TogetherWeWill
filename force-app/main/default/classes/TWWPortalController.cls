/**
* @File Name : TWWPortalController.cls
* @Description : Controller for Together We Will Portal - Retrieves content from Custom Metadata
* @Author : Accenture
* @Last Modified By :
* @Last Modified On :
* @Modification Log :
**/
public with sharing class TWWPortalController {
    
    /************
    * Name : getContentByCategory
    * Description: Retrieves TWW Content metadata records by category
    * Parameters: String category - Category filter (e.g., 'What we do', 'Impact')
    * ReturnType: List<ContentWrapper>
    ****************/
    @AuraEnabled(cacheable=true)
    public static List<ContentWrapper> getContentByCategory(String category) {
        List<ContentWrapper> contentList = new List<ContentWrapper>();
        
        try {
            List<TWW_Content__mdt> metadataRecords;
            
            if (String.isNotBlank(category)) {
                metadataRecords = [
                    SELECT DeveloperName, MasterLabel, Title__c, Description__c, Details__c, Category__c
                    FROM TWW_Content__mdt
                    WHERE Category__c = :category
                    ORDER BY MasterLabel ASC
                ];
            } else {
                metadataRecords = [
                    SELECT DeveloperName, MasterLabel, Title__c, Description__c, Details__c, Category__c
                    FROM TWW_Content__mdt
                    ORDER BY MasterLabel ASC
                ];
            }
            
            for (TWW_Content__mdt record : metadataRecords) {
                ContentWrapper wrapper = new ContentWrapper();
                wrapper.developerName = record.DeveloperName;
                wrapper.name = record.MasterLabel;
                wrapper.title = record.Title__c;
                wrapper.description = record.Description__c;
                wrapper.details = record.Details__c;
                wrapper.category = record.Category__c;
                contentList.add(wrapper);
            }
            
        } catch (Exception e) {
            System.debug('Error in getContentByCategory: ' + e.getMessage());
            throw new AuraHandledException('Error retrieving content: ' + e.getMessage());
        }
        
        return contentList;
    }
    
    /************
    * Name : getAllContent
    * Description: Retrieves all TWW Content metadata records
    * Parameters: None
    * ReturnType: List<ContentWrapper>
    ****************/
    @AuraEnabled(cacheable=true)
    public static List<ContentWrapper> getAllContent() {
        return getContentByCategory(null);
    }
    
    /**
    * Wrapper class for content metadata
    **/
    public class ContentWrapper {
        @AuraEnabled public String developerName { get; set; }
        @AuraEnabled public String name { get; set; }
        @AuraEnabled public String title { get; set; }
        @AuraEnabled public String description { get; set; }
        @AuraEnabled public String details { get; set; }
        @AuraEnabled public String category { get; set; }
    }
}