import React from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { states } from '../../data/states'
import styles from './EmployeeForm.module.css'

const AddressFields = ({ formData, handleChange, errors }) => {
  return (
    <fieldset className={styles.fieldsetContainer}>
      <legend>Address</legend>

      <InputField
        name="street"
        label="Street"
        type="text"
        value={formData.street}
        onChange={handleChange}
        error={errors.street}
      />

      <InputField
        name="city"
        label="City"
        type="text"
        value={formData.city}
        onChange={handleChange}
        error={errors.city}
      />

      <SelectField
        name="state"
        label="State"
        value={formData.state}
        onChange={handleChange}
        options={[
          { value: '', label: 'Please select a state' }, // Option de placeholder
          ...states.map((state) => ({
            value: state.abbreviation,
            label: state.name,
          })),
        ]}
      />

      <InputField
        name="zipCode"
        label="Zip Code"
        type="number"
        value={formData.zipCode}
        onChange={handleChange}
        error={errors.zipCode}
      />
    </fieldset>
  )
}

export default AddressFields
