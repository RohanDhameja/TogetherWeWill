/**
* @File Name : volunteerWebToCaseForm.js
* @Description : JavaScript controller for Volunteer Web-to-Case Form component
* @Author : Accenture
* @Last Modified By :
* @Last Modified On :
* @Modification Log :
**/
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createVolunteerCase from '@salesforce/apex/TWWWebToCaseService.createVolunteerCase';

export default class VolunteerWebToCaseForm extends LightningElement {
    @api recordId;
    @track isModalOpen = false;
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track mobileNumber = '';
    @track industry = '';
    @track skills = [];
    @track street = '';
    @track city = '';
    @track state = '';
    @track postalCode = '';
    @track country = 'India';
    @track availability = '';
    @track errorMessage = '';
    @track isSubmitting = false;

    /**************
    * Name : skillsOptions
    * Description: Returns skills dual listbox options
    * Parameters: None
    * ReturnType: Array of options
    **************/
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

    /**************
    * Name : stateOptions
    * Description: Returns India state options
    * Parameters: None
    * ReturnType: Array of options
    **************/
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

    /**************
    * Name : availabilityOptions
    * Description: Returns availability combobox options
    * Parameters: None
    * ReturnType: Array of options
    **************/
    get availabilityOptions() {
        return [
            { label: 'Weekdays', value: 'Weekdays' },
            { label: 'Weekends', value: 'Weekends' },
            { label: 'Both Weekdays and Weekends', value: 'Both Weekdays and Weekends' },
            { label: 'Flexible', value: 'Flexible' },
            { label: 'Specific Days (Will discuss)', value: 'Specific Days (Will discuss)' }
        ];
    }

    /**************
    * Name : openModal
    * Description: Opens the volunteer registration modal
    * Parameters: None
    * ReturnType: void
    **************/
    @api
    openModal() {
        console.log('openModal called on volunteerWebToCaseForm');
        this.isModalOpen = true;
        console.log('isModalOpen set to:', this.isModalOpen);
        this.resetForm();
    }

    /**************
    * Name : closeModal
    * Description: Closes the volunteer registration modal
    * Parameters: None
    * ReturnType: void
    **************/
    closeModal() {
        this.isModalOpen = false;
        this.resetForm();
    }

    /**************
    * Name : handleInputChange
    * Description: Handles input field changes
    * Parameters: event - Input change event
    * ReturnType: void
    **************/
    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'skills') {
            this.skills = event.detail.value;
        } else {
            this[field] = event.detail.value;
        }
        this.errorMessage = '';
    }

    /**************
    * Name : validateForm
    * Description: Validates form fields before submission
    * Parameters: None
    * ReturnType: Boolean - true if valid, false otherwise
    **************/
    validateForm() {
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

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.email)) {
            this.errorMessage = 'Please enter a valid email address.';
            return false;
        }

        if (!this.mobileNumber || this.mobileNumber.trim() === '') {
            this.errorMessage = 'Please enter your mobile number.';
            return false;
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(this.mobileNumber.trim())) {
            this.errorMessage = 'Please enter a valid 10-digit mobile number.';
            return false;
        }

        return true;
    }

    /**************
    * Name : handleSubmit
    * Description: Handles form submission
    * Parameters: None
    * ReturnType: void
    **************/
    handleSubmit() {
        this.errorMessage = '';

        if (!this.validateForm()) {
            return;
        }

        this.isSubmitting = true;

        const volunteerData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobileNumber: this.mobileNumber,
            industry: this.industry,
            skills: this.skills.join('; '),
            street: this.street,
            city: this.city,
            state: this.state,
            postalCode: this.postalCode,
            country: this.country,
            availability: this.availability
        };

        createVolunteerCase({ volunteerData: volunteerData })
            .then(result => {
                this.isSubmitting = false;
                this.showToast('Success!', 'Thank you for registering as a volunteer. We will contact you soon.', 'success');
                this.closeModal();
                this.dispatchEvent(new CustomEvent('volunteerregistered', { detail: { caseId: result } }));
            })
            .catch(error => {
                this.isSubmitting = false;
                this.errorMessage = error.body ? error.body.message : error.message;
                this.showToast('Error', this.errorMessage, 'error');
            });
    }

    /**************
    * Name : resetForm
    * Description: Resets all form fields to initial state
    * Parameters: None
    * ReturnType: void
    **************/
    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.mobileNumber = '';
        this.industry = '';
        this.skills = [];
        this.street = '';
        this.city = '';
        this.state = '';
        this.postalCode = '';
        this.country = 'India';
        this.availability = '';
        this.errorMessage = '';
        this.isSubmitting = false;
    }

    /**************
    * Name : showToast
    * Description: Shows toast notification message
    * Parameters: title (String), message (String), variant (String)
    * ReturnType: void
    **************/
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}