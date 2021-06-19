import React, { useState } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { FormGroup, Label, Button } from 'reactstrap';
import { localGetRequest } from '../services/request'
import logger from '../Logger'

const Calculator = () => {

    const [inputA, setInputA] = useState(0)
    const [inputB, setInputB] = useState(0)
    const [result, setResult] = useState('')
    const [selectedOption, setSelectedOption] = useState(0)

    const validate = () => {
        let errors = {}

        if (!isValidInput(inputA))
            errors.probabilityA = 'Invalid input'

        if (!isValidInput(inputB))
            errors.probabilityB = 'Invalid input'

        return errors
    }

    const submit = ({ setSubmitting }) => {
        localGetRequest(`/api/calculation/${selectedOption === 0 ? 'combined-with' : 'either'}`, { inputA, inputB } )
            .then(data => {
                setResult(data)
            })
            .catch(ex => {
                logger.error(ex.message)
            })
            .finally(
                setSubmitting(false)
            )
    }

    const handleValueChanged = (ev, callback) => {
        ev.preventDefault()
        const { value }= ev.target

        callback(value)
    }

    return (
        <div className='row'>
            <div className='col'>
                <h2>Probabilities Calculator</h2>
                <Formik
                    initialValues={{
                        probabilityA: inputA,
                        probabilityB: inputB,
                        result: result
                    }}
                    onSubmit={ submit }
                    validate={ validate }
                >
                    {({ errors }) => (
                        <Form>
                            <FormGroup>
                                <Label htmlFor='probabilityA'>Probability A</Label>
                                <Field
                                    id='probabilityA'
                                    name="probabilityA"
                                    className="form-control"
                                    type="number"
                                    max={1}
                                    min={0}
                                    step={0.01}
                                    onChange={(ev) => handleValueChanged(ev, setInputA)}
                                    value={inputA}
                                />
                                <ErrorMessage name="probabilityA" component="div" className='alert alert-danger' />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='probabilityB'>Probability B</Label>
                                <Field
                                    name="probabilityB"
                                    id="probabilityB"
                                    className="form-control"
                                    type="number"
                                    max={1}
                                    min={0}
                                    step={0.01}
                                    onChange={(ev) => handleValueChanged(ev, setInputB)}
                                    value={inputB}
                                />
                                <ErrorMessage name="probabilityB" component="div" className='alert alert-danger' />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="functionSelection">Operation</Label>
                                <Field as="select"
                                    name="functionSelection"
                                    id="functionSelection"
                                    className="form-control"
                                    onChange={(ev) => handleValueChanged(ev, setSelectedOption)}
                                >
                                    <option value={0}>CombinedWith</option>
                                    <option value={1}>Either</option>
                                </Field>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit" disabled={Object.keys(errors).length > 0}>Calculate</Button>
                            </FormGroup>
                            <FormGroup>
                                <Field
                                    name="result"
                                    className="form-control"
                                    type="text"
                                    disabled={true}
                                    value={result}
                                />
                            </FormGroup>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='col d-flex align-items-center'>
                <ul>
                    <li>Enter your input probabilities</li>
                    <li>Select which function you'd like to apply</li>
                    <li>Click calculate to see the results</li>
                    <li><em>NB:</em> inputs must be between 0 and 1</li>
                </ul>
            </div>
        </div>
    )

}

const isValidInput = (val) => {
    const numericVal = Number(val)

    if (isNaN(numericVal) || numericVal < 0 || numericVal > 1)
        return false

    return true
}

export default Calculator