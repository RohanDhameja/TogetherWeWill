/**
* @File Name : volunteerRegistrationForm.js
* @Description : JavaScript controller for Volunteer Registration Form using Account object
* @Author : Accenture
* @Last Modified By :
* @Last Modified On :
* @Modification Log :
**/
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createVolunteer from '@salesforce/apex/VolunteerRegistrationController.createVolunteer';

export default class VolunteerRegistrationForm extends LightningElement {
    @api recordId;
    @track isModalOpen = false;
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track mobileNumber = '';
    @track industry = '';
    @track panNumber = '';
    @track skills = [];
    @track street = '';
    @track city = '';
    @track state = '';
    @track postalCode = '';
    @track availability = '';
    @track errorMessage = '';
    @track isSubmitting = false;

    /************
    * Name : skillsOptions
    * Description: Returns skills multiselect picklist options
    * Parameters: None
    * ReturnType: Array of options
    ****************/
    get skillsOptions() {
        return [
            { label: 'Teaching & Education', value: 'Teaching & Education' },
            { label: 'Healthcare & Medical', value: 'Healthcare & Medical' },
            { label: 'Community Development', value: 'Community Development' },
            { label: 'Technology & IT', value: 'Technology & IT' },
            { label: 'Fundraising', value: 'Fundraising' },
            { label: 'Event Management', value: 'Event Management' },
            { label: 'Social Media & Marketing', value: 'Social Media & Marketing' },
            { label: 'Environment & Sustainability', value: 'Environment & Sustainability' },
            { label: 'Child Welfare', value: 'Child Welfare' },
            { label: 'Women Empowerment', value: 'Women Empowerment' },
            { label: 'Administrative Support', value: 'Administrative Support' },
            { label: 'Other', value: 'Other' }
        ];
    }

    /************
    * Name : stateOptions
    * Description: Returns India state options
    * Parameters: None
    * ReturnType: Array of options
    ****************/
    get stateOptions() {
        return [
            { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
            { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
            { label: 'Assam', value: 'Assam' },
            { label: 'Bihar', value: 'Bihar' },
            { label: 'Chhattisgarh', value: 'Chhattisgarh' },
            { label: 'Delhi', value: 'Delhi' },
            { label: 'Goa', value: 'Goa' },
            { label: 'Gujarat', value: 'Gujarat' },
            { label: 'Haryana', value: 'Haryana' },
            { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
            { label: 'Jharkhand', value: 'Jharkhand' },
            { label: 'Karnataka', value: 'Karnataka' },
            { label: 'Kerala', value: 'Kerala' },
            { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
            { label: 'Maharashtra', value: 'Maharashtra' },
            { label: 'Manipur', value: 'Manipur' },
            { label: 'Meghalaya', value: 'Meghalaya' },
            { label: 'Mizoram', value: 'Mizoram' },
            { label: 'Nagaland', value: 'Nagaland' },
            { label: 'Odisha', value: 'Odisha' },
            { label: 'Punjab', value: 'Punjab' },
            { label: 'Rajasthan', value: 'Rajasthan' },
            { label: 'Sikkim', value: 'Sikkim' },
            { label: 'Tamil Nadu', value: 'Tamil Nadu' },
            { label: 'Telangana', value: 'Telangana' },
            { label: 'Tripura', value: 'Tripura' },
            { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
            { label: 'Uttarakhand', value: 'Uttarakhand' },
            { label: 'West Bengal', value: 'West Bengal' }
        ];
    }

    /************
    * Name : openModal
    * Description: Opens the volunteer registration modal
    * Parameters: None
    * ReturnType: void
    ****************/
    @api
    openModal() {
        this.isModalOpen = true;
        this.resetForm();
    }

    /************
    * Name : closeModal
    * Description: Closes the volunteer registration modal
    * Parameters: None
    * ReturnType: void
    ****************/
    closeModal() {
        this.isModalOpen = false;
        this.resetForm();
    }

    /************
    * Name : handleInputChange
    * Description: Handles input field changes
    * Parameters: event - Input change event
    * ReturnType: void
    ****************/
    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'skills') {
            this.skills = event.detail.value;
        } else {
            this[field] = event.detail.value;
        }
        this.errorMessage = '';
    }

    /************
    * Name : validateForm
    * Description: Validates form fields before submission
    * Parameters: None
    * ReturnType: Boolean - true if valid, false otherwise
    ****************/
    validateForm() {
        // Check required fields
        if (!this.firstName || this.firstName.trim() === '') {
            this.errorMessage = 'Please enter your first name.';
            return false;
        }

        if (!this.lastName || this.lastName.trim() === '') {
            this.errorMessage = 'Please enter your last name.';
            return false;
        }

        if (!this.email || this.email.trim() === '') {
            this.errorMessage = 'Please enter your email address.';
            return false;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            this.errorMessage = 'Please enter a valid email address.';
            return false;
        }

        if (!this.mobileNumber || this.mobileNumber.trim() === '') {
            this.errorMessage = 'Please enter your mobile number.';
            return false;
        }

        // Mobile number validation (Indian format)
        const mobileRegex = /^[6-9][0-9]{9}$/;
        if (!mobileRegex.test(this.mobileNumber)) {
            this.errorMessage = 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
            return false;
        }

        // PAN validation if provided
        if (this.panNumber && this.panNumber.trim() !== '') {
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            if (!panRegex.test(this.panNumber.toUpperCase())) {
                this.errorMessage = 'Please enter a valid PAN number (e.g., ABCDE1234F).';
                return false;
            }
        }

        // Postal code validation if provided
        if (this.postalCode && this.postalCode.trim() !== '') {
            const postalRegex = /^[0-9]{6}$/;
            if (!postalRegex.test(this.postalCode)) {
                this.errorMessage = 'Please enter a valid 6-digit postal code.';
                return false;
            }
        }

        return true;
    }

    /************
    * Name : handleSubmit
    * Description: Handles form submission
    * Parameters: None
    * ReturnType: void
    ****************/
    handleSubmit() {
        // Reset error message
        this.errorMessage = '';

        // Validate form
        if (!this.validateForm()) {
            return;
        }

        this.isSubmitting = true;

        // Prepare volunteer data
        const volunteerData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobileNumber: this.mobileNumber,
            industry: this.industry,
            panNumber: this.panNumber ? this.panNumber.toUpperCase() : '',
            donorType: 'Volunteer', // Set as Volunteer type
            skills: this.skills.join(';'),
            street: this.street,
            city: this.city,
            state: this.state,
            postalCode: this.postalCode,
            country: 'India',
            availability: this.availability
        };

        // Call Apex method to create volunteer account record
        createVolunteer({ volunteerData: volunteerData })
            .then(result => {
                this.isSubmitting = false;
                this.showToast('Success!', 'Thank you for volunteering with us! We will contact you soon.', 'success');
                this.closeModal();
                
                // Dispatch custom event to parent component
                this.dispatchEvent(new CustomEvent('volunteercreated', {
                    detail: { volunteerId: result }
                }));
            })
            .catch(error => {
                this.isSubmitting = false;
                let errorMsg = 'An error occurred while submitting your registration. Please try again.';
                if (error && error.body && error.body.message) {
                    errorMsg = error.body.message;
                }
                this.errorMessage = errorMsg;
                this.showToast('Error', errorMsg, 'error');
            });
    }

    /************
    * Name : resetForm
    * Description: Resets all form fields
    * Parameters: None
    * ReturnType: void
    ****************/
    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.mobileNumber = '';
        this.industry = '';
        this.panNumber = '';
        this.skills = [];
        this.street = '';
        this.city = '';
        this.state = '';
        this.postalCode = '';
        this.availability = '';
        this.errorMessage = '';
        this.isSubmitting = false;
    }

    /************
    * Name : showToast
    * Description: Displays toast notification
    * Parameters: title - Toast title, message - Toast message, variant - Toast variant
    * ReturnType: void
    ****************/
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}