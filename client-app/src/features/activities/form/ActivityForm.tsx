import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layouts/LoadingComponents";
import { Formik, Form, } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";


export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { loading, loadActivity, loadingInitial, createActivity, updateActivity, 
    } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        duration: 0,
        city: '',
        venue: ''
    });

    const validationScheme = Yup.object({
        title: Yup.string().required('Please enter a Title'),
        description: Yup.string().required('Please enter a description'),
        category: Yup.string().required('Please enter a Category'),
        date: Yup.string().required().nonNullable('Please enter a Date'),
        duration: Yup.number().required('Please enter a duration'),
        city: Yup.string().required('Please enter a Location'),
        venue: Yup.string().required('Pleae enter a Venue'),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

     function handleFormSubmit(activity: Activity) {
         if (!activity.id) {
             activity.id = uuid();
             createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
         } else {
             updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
         }
    }

    if (loadingInitial) return <LoadingComponent content="loading activity ..." />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik 
                validationSchema={validationScheme}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <TextInput name='title' placeholder='Title'  />                        
                        <TextAreaInput rows={5}name='description' placeholder='Description' />
                        <SelectInput options={categoryOptions} placeholder='Category' name='category'/>
                        <Header content='Date and Time - duration in minutes' sub color='teal' />
                        <DateInput 
                            placeholderText = 'Date' 
                            name = 'date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <TextInput placeholder='Duration' name='duration' />
                        <Header content='Location Details' sub color='teal' />
                        <TextInput placeholder='City' name='city' />
                        <TextInput placeholder='Venue' name='venue' />
                        <Button as={Link} to={'/activities'} floated="right" type="button" content="Cancel" />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated="right" 
                            positive 
                            type="submit" 
                            content="Submit" />
                    </Form>
                )}
            </Formik>
        </Segment>

    )

})