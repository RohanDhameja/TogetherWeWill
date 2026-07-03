/**
* @File Name : TWWWebToCaseService.cls
* @Description : Service class for creating Web-to-Case records for volunteer inquiries
* @Author : Accenture
* @Last Modified By :
* @Last Modified On :
* @Modification Log :
**/
public with sharing class TWWWebToCaseService {
    
    // Constants for Case creation
    private static final String VOLUNTEER_RECORD_TYPE = 'Volunteer';
    private static final String CASE_STATUS_NEW = 'New';
    private static final String CASE_ORIGIN_WEB = 'Web';
    
    /************
    * Name : createVolunteerCase
    * Description: Creates a Case record with Volunteer record type from volunteer form data
    * Parameters: Map<String, Object> volunteerData - Map containing volunteer information
    * ReturnType: String - Case ID
    ****************/
    @AuraEnabled
    public static String createVolunteerCase(Map<String, Object> volunteerData) {
        try {
            // Validate input
            if (volunteerData == null || volunteerData.isEmpty()) {
                throw new AuraHandledException('Volunteer data cannot be empty.');
            }
            
            // Get Volunteer record type
            Id volunteerRecordTypeId = getRecordTypeId(VOLUNTEER_RECORD_TYPE);
            
            if (volunteerRecordTypeId == null) {
                throw new AuraHandledException('Volunteer record type not found. Please contact system administrator.');
            }
            
            // Check CRUD permissions
            if (!Schema.sObjectType.Case.isCreateable()) {
                throw new AuraHandledException('You do not have permission to create Case records.');
            }
            
            // Prepare Case record
            Case volunteerCase = buildVolunteerCase(volunteerData, volunteerRecordTypeId);
            
            // Insert Case record
            Database.SaveResult saveResult = Database.insert(volunteerCase, false);
            
            if (saveResult.isSuccess()) {
                return saveResult.getId();
            } else {
                String errorMsg = 'Error creating volunteer case: ';
                for (Database.Error err : saveResult.getErrors()) {
                    errorMsg += err.getMessage() + ' ';
                }
                throw new AuraHandledException(errorMsg);
            }
            
        } catch (AuraHandledException e) {
            throw e;
        } catch (Exception e) {
            throw new AuraHandledException('An unexpected error occurred: ' + e.getMessage());
        }
    }
    
    /************
    * Name : createVolunteerCaseBulk
    * Description: Creates multiple Case records with Volunteer record type (bulkified version)
    * Parameters: List<Map<String, Object>> volunteerDataList - List of volunteer data maps
    * ReturnType: List<String> - List of Case IDs
    ****************/
    public static List<String> createVolunteerCaseBulk(List<Map<String, Object>> volunteerDataList) {
        List<String> caseIds = new List<String>();
        
        try {
            // Validate input
            if (volunteerDataList == null || volunteerDataList.isEmpty()) {
                throw new IllegalArgumentException('Volunteer data list cannot be empty.');
            }
            
            // Get Volunteer record type
            Id volunteerRecordTypeId = getRecordTypeId(VOLUNTEER_RECORD_TYPE);
            
            if (volunteerRecordTypeId == null) {
                throw new IllegalArgumentException('Volunteer record type not found.');
            }
            
            // Check CRUD permissions
            if (!Schema.sObjectType.Case.isCreateable()) {
                throw new IllegalArgumentException('No permission to create Case records.');
            }
            
            // Build list of Case records
            List<Case> casesToInsert = new List<Case>();
            for (Map<String, Object> volunteerData : volunteerDataList) {
                Case volunteerCase = buildVolunteerCase(volunteerData, volunteerRecordTypeId);
                casesToInsert.add(volunteerCase);
            }
            
            // Insert all cases
            if (!casesToInsert.isEmpty()) {
                Database.SaveResult[] saveResults = Database.insert(casesToInsert, false);
                
                for (Database.SaveResult sr : saveResults) {
                    if (sr.isSuccess()) {
                        caseIds.add(sr.getId());
                    }
                }
            }
            
            return caseIds;
            
        } catch (Exception e) {
            System.debug('Error in createVolunteerCaseBulk: ' + e.getMessage());
            return caseIds;
        }
    }
    
    /************
    * Name : buildVolunteerCase
    * Description: Builds a Case record from volunteer data using standard Case fields
    * Parameters: Map<String, Object> volunteerData, Id recordTypeId
    * ReturnType: Case
    ****************/
    private static Case buildVolunteerCase(Map<String, Object> volunteerData, Id recordTypeId) {
        // Build subject line
        String firstName = String.valueOf(volunteerData.get('firstName'));
        String lastName = String.valueOf(volunteerData.get('lastName'));
        String subject = 'Volunteer Inquiry - ' + firstName + ' ' + lastName;
        
        // Create Case record using standard fields only
        Case volunteerCase = new Case(
            RecordTypeId = recordTypeId,
            Subject = subject,
            Status = CASE_STATUS_NEW,
            Origin = CASE_ORIGIN_WEB,
            SuppliedName = firstName + ' ' + lastName,
            SuppliedEmail = String.valueOf(volunteerData.get('email')),
            SuppliedPhone = String.valueOf(volunteerData.get('mobileNumber')),
            Description = buildDescription(volunteerData)
        );
        
        return volunteerCase;
    }
    
    /************
    * Name : buildDescription
    * Description: Builds comprehensive description text from volunteer data
    * Parameters: Map<String, Object> volunteerData
    * ReturnType: String
    ****************/
    private static String buildDescription(Map<String, Object> volunteerData) {
        String description = '=== VOLUNTEER INQUIRY ===\n\n';
        description += 'Volunteer Name: ' + volunteerData.get('firstName') + ' ' + volunteerData.get('lastName') + '\n';
        description += 'Email: ' + volunteerData.get('email') + '\n';
        description += 'Mobile Number: ' + volunteerData.get('mobileNumber') + '\n\n';
        
        if (volunteerData.get('industry') != null && String.isNotBlank(String.valueOf(volunteerData.get('industry')))) {
            description += 'Industry Background: ' + volunteerData.get('industry') + '\n';
        }
        
        if (volunteerData.get('skills') != null && String.isNotBlank(String.valueOf(volunteerData.get('skills')))) {
            description += '\nSkills Offered:\n' + volunteerData.get('skills') + '\n';
        }
        
        if (volunteerData.get('availability') != null && String.isNotBlank(String.valueOf(volunteerData.get('availability')))) {
            description += '\nAvailability:\n' + volunteerData.get('availability') + '\n';
        }
        
        // Address information
        Boolean hasAddress = false;
        String addressLine = '';
        
        if (volunteerData.get('street') != null && String.isNotBlank(String.valueOf(volunteerData.get('street')))) {
            addressLine += volunteerData.get('street') + '\n';
            hasAddress = true;
        }
        
        if (volunteerData.get('city') != null && String.isNotBlank(String.valueOf(volunteerData.get('city')))) {
            addressLine += volunteerData.get('city');
            hasAddress = true;
            
            if (volunteerData.get('state') != null && String.isNotBlank(String.valueOf(volunteerData.get('state')))) {
                addressLine += ', ' + volunteerData.get('state');
            }
            
            if (volunteerData.get('postalCode') != null && String.isNotBlank(String.valueOf(volunteerData.get('postalCode')))) {
                addressLine += ' - ' + volunteerData.get('postalCode');
            }
            
            addressLine += '\n';
        }
        
        if (volunteerData.get('country') != null && String.isNotBlank(String.valueOf(volunteerData.get('country')))) {
            addressLine += volunteerData.get('country') + '\n';
            hasAddress = true;
        }
        
        if (hasAddress) {
            description += '\nAddress:\n' + addressLine;
        }
        
        description += '\n---\nThis volunteer inquiry was submitted through the Together We Will website.';
        
        return description;
    }
    
    /************
    * Name : getRecordTypeId
    * Description: Gets Case record type ID by developer name
    * Parameters: String developerName - Developer name of the record type
    * ReturnType: Id - Record type ID
    ****************/
    private static Id getRecordTypeId(String developerName) {
        if (String.isBlank(developerName)) {
            return null;
        }
        
        try {
            RecordType rt = [
                SELECT Id 
                FROM RecordType 
                WHERE SObjectType = 'Case' 
                AND DeveloperName = :developerName 
                AND IsActive = true 
                LIMIT 1
            ];
            return rt.Id;
        } catch (QueryException e) {
            System.debug('Record type not found: ' + e.getMessage());
            return null;
        }
    }
}