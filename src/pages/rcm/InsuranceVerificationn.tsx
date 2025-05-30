import React, { useState } from 'react';
import axios from 'axios';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import './InsuranceVerification.css';

// Define interface for form errors
interface FormErrors {
  insuranceProvider?: string;
  policyNumber?: string;
  memberId?: string;
  providerPhone?: string;
  verificationDate?: string;
  patientFirstName?: string;
  patientLastName?: string;
  patientDob?: string;
  patientGender?: string;
  patientPhone?: string;
  patientEmail?: string;
  subscriberFirstName?: string;
  subscriberLastName?: string;
  subscriberDob?: string;
  serviceType?: string;
  serviceDate?: string;
  diagnosisCodes?: string;
  procedureCodes?: string;
  facility?: string;
  [key: string]: string | undefined; // Index signature for any other potential errors
}

// Define interface for form data
interface FormData {
  // Provider Information
  insuranceProvider: string;
  policyNumber: string;
  memberId: string;
  groupNumber: string;
  providerPhone: string;
  providerAddress: string;
  insuranceType: string;
  verificationDate: string;
  
  // Patient Information
  patientFirstName: string;
  patientLastName: string;
  patientDob: string;
  patientGender: string;
  patientAddress: string;
  patientPhone: string;
  patientEmail: string;
  relationshipToSubscriber: string;
  
  // Subscriber Information (conditional)
  subscriberFirstName: string;
  subscriberLastName: string;
  subscriberDob: string;
  subscriberGender: string;
  subscriberAddress: string;
  subscriberPhone: string;
  subscriberEmail: string;
  
  // Service Information
  serviceType: string;
  serviceDate: string;
  diagnosisCodes: string[];
  procedureCodes: string[];
  referringProvider: string;
  facility: string;
  priorAuthorizationNumber: string;
}

// Define interface for verification result
interface VerificationResult {
  success: boolean;
  data?: any;
  message: string;
  benefits?: string[];
}

const InsuranceVerification: React.FC = () => {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Initial form state
  const [formData, setFormData] = useState<FormData>({
    // Provider Information
    insuranceProvider: '',
    policyNumber: '',
    memberId: '',
    groupNumber: '',
    providerPhone: '',
    providerAddress: '',
    insuranceType: 'commercial',
    verificationDate: new Date().toISOString().split('T')[0],
    
    // Patient Information
    patientFirstName: '',
    patientLastName: '',
    patientDob: '',
    patientGender: '',
    patientAddress: '',
    patientPhone: '',
    patientEmail: '',
    relationshipToSubscriber: 'self',
    
    // Subscriber Information (conditional)
    subscriberFirstName: '',
    subscriberLastName: '',
    subscriberDob: '',
    subscriberGender: '',
    subscriberAddress: '',
    subscriberPhone: '',
    subscriberEmail: '',
    
    // Service Information
    serviceType: '',
    serviceDate: new Date().toISOString().split('T')[0],
    diagnosisCodes: [],
    procedureCodes: [],
    referringProvider: '',
    facility: '',
    priorAuthorizationNumber: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setFormData({ ...formData, [name]: selectedValues });
  };

  // Form validation
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Provider Information Validation
    if (!formData.insuranceProvider) newErrors.insuranceProvider = 'Insurance provider is required';
    if (!formData.policyNumber) newErrors.policyNumber = 'Policy number is required';
    if (!formData.memberId) newErrors.memberId = 'Member ID is required';
    if (!formData.providerPhone || !/^[0-9]{10}$/.test(formData.providerPhone)) {
      newErrors.providerPhone = 'Provider phone must be 10 digits';
    }
    if (!formData.verificationDate) newErrors.verificationDate = 'Verification date is required';
    
    // Patient Information Validation
    if (!formData.patientFirstName) newErrors.patientFirstName = 'Patient first name is required';
    if (!formData.patientLastName) newErrors.patientLastName = 'Patient last name is required';
    if (!formData.patientDob) {
      newErrors.patientDob = 'Patient date of birth is required';
    } else if (new Date(formData.patientDob) > new Date()) {
      newErrors.patientDob = 'Date of birth cannot be in the future';
    }
    if (!formData.patientGender) newErrors.patientGender = 'Patient gender is required';
    if (!formData.patientPhone || !/^[0-9]{10}$/.test(formData.patientPhone)) {
      newErrors.patientPhone = 'Phone must be 10 digits';
    }
    if (formData.patientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Invalid email format';
    }
    
    // Subscriber Information Validation (conditional)
    if (formData.relationshipToSubscriber !== 'self') {
      if (!formData.subscriberFirstName) newErrors.subscriberFirstName = 'Subscriber first name is required';
      if (!formData.subscriberLastName) newErrors.subscriberLastName = 'Subscriber last name is required';
      if (!formData.subscriberDob) {
        newErrors.subscriberDob = 'Subscriber date of birth is required';
      } else if (new Date(formData.subscriberDob) > new Date()) {
        newErrors.subscriberDob = 'Date of birth cannot be in the future';
      }
    }
    
    // Service Information Validation
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.serviceDate) {
      newErrors.serviceDate = 'Service date is required';
    } else if (new Date(formData.serviceDate) < new Date()) {
      newErrors.serviceDate = 'Service date cannot be in the past';
    }
    if (!formData.diagnosisCodes || formData.diagnosisCodes.length === 0) {
      newErrors.diagnosisCodes = 'At least one diagnosis code is required';
    }
    if (!formData.procedureCodes || formData.procedureCodes.length === 0) {
      newErrors.procedureCodes = 'At least one procedure code is required';
    }
    if (!formData.facility) newErrors.facility = 'Facility is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Send data to backend API
      const response = await axios.post(
        'http://localhost:5000/api/submit_insurance',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setVerificationResult({
        success: true,
        data: response.data, // Use the response from your backend
        message: 'Insurance verification submitted successfully'
      });
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      setVerificationResult({
        success: false,
        message: error.response?.data?.message || 
               'Failed to submit insurance verification. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verify insurance function
  const verifyInsurance = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/submit_insurance',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
        
      setVerificationResult({
        success: true,
        data: response.data,
        message: 'Insurance verification submitted successfully',
      });
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      setVerificationResult({
        success: false,
        message:
          error.response?.data?.message ||
          'Failed to submit insurance verification. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  // Function to export form data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('Insurance Verification Form', 14, 20);

    // Add table header
    doc.setFontSize(12);
    doc.text('Provider Information', 14, 30);
    const providerData = [
      ['Insurance Provider', formData.insuranceProvider],
      ['Policy Number', formData.policyNumber],
      ['Member ID', formData.memberId],
      ['Group Number', formData.groupNumber],
      ['Provider Phone', formData.providerPhone],
      ['Provider Address', formData.providerAddress],
      ['Insurance Type', formData.insuranceType],
      ['Verification Date', formData.verificationDate],
    ];
    doc.autoTable({
      startY: 35,
      head: [['Field', 'Value']],
      body: providerData,
    });

    // Add Patient Information
    doc.addPage();
    doc.text('Patient Information', 14, 20);
    const patientData = [
      ['First Name', formData.patientFirstName],
      ['Last Name', formData.patientLastName],
      ['Date of Birth', formData.patientDob],
      ['Gender', formData.patientGender],
      ['Phone', formData.patientPhone],
      ['Email', formData.patientEmail],
    ];
    doc.autoTable({
      startY: 25,
      head: [['Field', 'Value']],
      body: patientData,
    });

    // Add Subscriber Information (if available)
    if (formData.relationshipToSubscriber !== 'self') {
      doc.addPage();
      doc.text('Subscriber Information', 14, 20);
      const subscriberData = [
        ['First Name', formData.subscriberFirstName],
        ['Last Name', formData.subscriberLastName],
        ['Date of Birth', formData.subscriberDob],
        ['Gender', formData.subscriberGender],
        ['Phone', formData.subscriberPhone],
        ['Email', formData.subscriberEmail],
      ];
      doc.autoTable({
        startY: 25,
        head: [['Field', 'Value']],
        body: subscriberData,
      });
    }

    // Add Service Information
    doc.addPage();
    doc.text('Service Information', 14, 20);
    const serviceData = [
      ['Service Type', formData.serviceType],
      ['Service Date', formData.serviceDate],
      ['Facility', formData.facility],
      ['Diagnosis Codes', formData.diagnosisCodes.join(', ')],
      ['Procedure Codes', formData.procedureCodes.join(', ')],
      ['Referring Provider', formData.referringProvider],
      ['Prior Authorization Number', formData.priorAuthorizationNumber],
    ];
    doc.autoTable({
      startY: 25,
      head: [['Field', 'Value']],
      body: serviceData,
    });

    // Save PDF
    doc.save('insurance-verification-form.pdf');
  };

  return (
    <div className="insurance-verification-container">
      <h2>Insurance Verification</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Provider Information Section */}
        <div className="form-section provider-section">
          <h3>Provider Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="insuranceProvider">Insurance Provider*</label>
              <select
                id="insuranceProvider"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
              >
                <option value="">Select Provider</option>
                <option value="Aetna">Aetna</option>
                <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
                <option value="Cigna">Cigna</option>
                <option value="UnitedHealthcare">UnitedHealthcare</option>
                <option value="other">Other</option>
              </select>
              {errors.insuranceProvider && <div className="error-message">{errors.insuranceProvider}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="insuranceType">Insurance Type*</label>
              <select
                id="insuranceType" 
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
              >
                <option value="commercial">Commercial</option>
                <option value="medicare">Medicare</option>
                <option value="medicaid">Medicaid</option>
                <option value="tricare">TRICARE</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="policyNumber">Policy Number*</label>
              <input
                type="text"
                id="policyNumber"
                name="policyNumber"
                placeholder="Enter policy number"
                value={formData.policyNumber}
                onChange={handleChange}
              />
              {errors.policyNumber && <div className="error-message">{errors.policyNumber}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="memberId">Member ID*</label>
              <input
                type="text"
                id="memberId"
                name="memberId"
                placeholder="Enter member ID"
                value={formData.memberId}
                onChange={handleChange}
              />
              {errors.memberId && <div className="error-message">{errors.memberId}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="groupNumber">Group Number</label>
              <input
                type="text"
                id="groupNumber"
                name="groupNumber"
                placeholder="Enter group number"
                value={formData.groupNumber}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="providerPhone">Provider Phone*</label>
              <input
                type="text"
                id="providerPhone"
                name="providerPhone"
                placeholder="(123) 456-7890"
                value={formData.providerPhone}
                onChange={handleChange}
              />
              {errors.providerPhone && <div className="error-message">{errors.providerPhone}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="providerAddress">Provider Address</label>
            <textarea
              id="providerAddress"
              name="providerAddress"
              rows={2}
              value={formData.providerAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Patient Information Section */}
        <div className="form-section patient-section">
          <h3>Patient Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientFirstName">First Name*</label>
              <input
                type="text"
                id="patientFirstName"
                name="patientFirstName"
                placeholder="Patient first name"
                value={formData.patientFirstName}
                onChange={handleChange}
              />
              {errors.patientFirstName && <div className="error-message">{errors.patientFirstName}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="patientLastName">Last Name*</label>
              <input
                type="text"
                id="patientLastName"
                name="patientLastName"
                placeholder="Patient last name"
                value={formData.patientLastName}
                onChange={handleChange}
              />
              {errors.patientLastName && <div className="error-message">{errors.patientLastName}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientDob">Date of Birth*</label>
              <input
                type="date"
                id="patientDob"
                name="patientDob"
                max={new Date().toISOString().split('T')[0]}
                value={formData.patientDob}
                onChange={handleChange}
              />
              {errors.patientDob && <div className="error-message">{errors.patientDob}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="patientGender">Gender*</label>
              <select
                id="patientGender"
                name="patientGender"
                value={formData.patientGender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="unknown">Prefer not to say</option>
              </select>
              {errors.patientGender && <div className="error-message">{errors.patientGender}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientPhone">Phone*</label>
              <input
                type="text"
                id="patientPhone"
                name="patientPhone"
                placeholder="(123) 456-7890"
                value={formData.patientPhone}
                onChange={handleChange}
              />
              {errors.patientPhone && <div className="error-message">{errors.patientPhone}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="patientEmail">Email</label>
              <input
                type="email"
                id="patientEmail"
                name="patientEmail"
                placeholder="patient@example.com"
                value={formData.patientEmail}
                onChange={handleChange}
              />
              {errors.patientEmail && <div className="error-message">{errors.patientEmail}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="patientAddress">Address</label>
            <textarea
              id="patientAddress"
              name="patientAddress"
              rows={2}
              value={formData.patientAddress}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="relationshipToSubscriber">Relationship to Subscriber*</label>
            <select
              id="relationshipToSubscriber"
              name="relationshipToSubscriber"
              value={formData.relationshipToSubscriber}
              onChange={handleChange}
            >
              <option value="self">Self</option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        {/* Subscriber Information (Conditional) */}
        {formData.relationshipToSubscriber !== 'self' && (
          <div className="form-section subscriber-section">
            <h3>Subscriber Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="subscriberFirstName">First Name*</label>
                <input
                  type="text"
                  id="subscriberFirstName"
                  name="subscriberFirstName"
                  placeholder="Subscriber first name"
                  value={formData.subscriberFirstName}
                  onChange={handleChange}
                />
                {errors.subscriberFirstName && <div className="error-message">{errors.subscriberFirstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subscriberLastName">Last Name*</label>
                <input
                  type="text"
                  id="subscriberLastName"
                  name="subscriberLastName"
                  placeholder="Subscriber last name"
                  value={formData.subscriberLastName}
                  onChange={handleChange}
                />
                {errors.subscriberLastName && <div className="error-message">{errors.subscriberLastName}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="subscriberDob">Date of Birth*</label>
                <input
                  type="date"
                  id="subscriberDob"
                  name="subscriberDob"
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.subscriberDob}
                  onChange={handleChange}
                />
                {errors.subscriberDob && <div className="error-message">{errors.subscriberDob}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subscriberGender">Gender*</label>
                <select
                  id="subscriberGender"
                  name="subscriberGender"
                  value={formData.subscriberGender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="unknown">Prefer not to say</option>
                </select>
                {errors.subscriberGender && <div className="error-message">{errors.subscriberGender}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="subscriberPhone">Phone*</label>
                <input
                  type="text"
                  id="subscriberPhone"
                  name="subscriberPhone"
                  placeholder="(123) 456-7890"
                  value={formData.subscriberPhone}
                  onChange={handleChange}
                />
                {errors.subscriberPhone && <div className="error-message">{errors.subscriberPhone}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subscriberEmail">Email</label>
                <input
                  type="email"
                  id="subscriberEmail"
                  name="subscriberEmail"
                  placeholder="subscriber@example.com"
                  value={formData.subscriberEmail}
                  onChange={handleChange}
                />
                {errors.subscriberEmail && <div className="error-message">{errors.subscriberEmail}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subscriberAddress">Address</label>
              <textarea
                id="subscriberAddress"
                name="subscriberAddress"
                rows={2}
                value={formData.subscriberAddress}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        
        {/* Service Information Section */}
        <div className="form-section service-section">
          <h3>Service Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceType">Service Type*</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="">Select Service Type</option>
                <option value="consultation">Consultation</option>
                <option value="surgery">Surgery</option>
                <option value="diagnostic">Diagnostic Test</option>
                <option value="therapy">Therapy</option>
                <option value="preventive">Preventive Care</option>
                <option value="emergency">Emergency Care</option>
              </select>
              {errors.serviceType && <div className="error-message">{errors.serviceType}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="serviceDate">Service Date*</label>
              <input
                type="date"
                id="serviceDate"
                name="serviceDate"
                min={new Date().toISOString().split('T')[0]}
                value={formData.serviceDate}
                onChange={handleChange}
              />
              {errors.serviceDate && <div className="error-message">{errors.serviceDate}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="diagnosisCodes">Diagnosis Codes* (ICD-10)</label>
              <select
                id="diagnosisCodes"
                name="diagnosisCodes"
                multiple
                value={formData.diagnosisCodes}
                onChange={handleMultiSelectChange}
              >
                <option value="E11.65">E11.65 - Type 2 diabetes with hyperglycemia</option>
                <option value="I10">I10 - Essential (primary) hypertension</option>
                <option value="M54.5">M54.5 - Low back pain</option>
                <option value="J18.9">J18.9 - Pneumonia, unspecified</option>
                <option value="Z79.899">Z79.899 - Other long term drug therapy</option>
              </select>
              {errors.diagnosisCodes && <div className="error-message">{errors.diagnosisCodes}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="procedureCodes">Procedure Codes* (CPT/HCPCS)</label>
              <select
                id="procedureCodes"
                name="procedureCodes"
                multiple
                value={formData.procedureCodes}
                onChange={handleMultiSelectChange}
              >
                <option value="99213">99213 - Office visit, established patient</option>
                <option value="99214">99214 - Office visit, established patient</option>
                <option value="93000">93000 - Electrocardiogram</option>
                <option value="80053">80053 - Comprehensive metabolic panel</option>
                <option value="G0439">G0439 - Annual wellness visit</option>
              </select>
              {errors.procedureCodes && <div className="error-message">{errors.procedureCodes}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="facility">Facility*</label>
              <select
                id="facility"
                name="facility"
                value={formData.facility}
                onChange={handleChange}
              >
                <option value="">Select Facility</option>
                <option value="main-hospital">Main Hospital</option>
                <option value="outpatient-clinic">Outpatient Clinic</option>
                <option value="surgery-center">Surgery Center</option>
                <option value="urgent-care">Urgent Care</option>
              </select>
              {errors.facility && <div className="error-message">{errors.facility}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="referringProvider">Referring Provider</label>
              <input
                type="text"
                id="referringProvider"
                name="referringProvider"
                placeholder="Dr. Smith"
                value={formData.referringProvider}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="priorAuthorizationNumber">Prior Authorization Number</label>
            <input
              type="text"
              id="priorAuthorizationNumber"
              name="priorAuthorizationNumber"
              placeholder="Enter if available"
              value={formData.priorAuthorizationNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={verifyInsurance}
            disabled={isLoading}
          >
            Verify Insurance
          </button>
        </div>
      </form>
      
      {verificationResult && (
        <div className={`verification-result ${verificationResult.success ? 'success' : 'error'}`}>
          {verificationResult.success ? (
            <>
              <h3>Insurance Verification Successful</h3>
              <div className="result-summary">
                <p><strong>Patient:</strong> {formData.patientFirstName} {verificationResult.data.patientLastName}</p>
                <p><strong>Insurance Provider:</strong> AIG (American International Group)</p>
                <p><strong>Coverage Status:</strong> Active</p>
                <p><strong>Service Type:</strong> Life Insurance</p>
              </div>
              {/* <div className="result-details">
                <h4>Covered Benefits:</h4>
                <ul>
                  {verificationResult.data.benefits && verificationResult.data.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div> */}
            </>
          ) : (
            <>
              <h3>Verification Failed</h3>
              <p>{verificationResult.message}</p>
            </>
          )}
        </div>
      )}
        {/* <div className="form-actions">
        <button onClick={exportToPDF}>Export to PDF</button>
        </div> */}
    </div>
  );
};

export default InsuranceVerification;