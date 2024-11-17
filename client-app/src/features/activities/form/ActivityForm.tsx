import { observer } from "mobx-react-lite";
import { Button, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layouts/LoadingComponents";
import { Formik, Form, Field, } from "formik";

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { loading, loadActivity, loadingInitial
    } = activityStore;
    const { id } = useParams();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    // function handelSubmit() {
    //     if (!activity.id) {
    //         activity.id = uuid();
    //         createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     } else {
    //         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     }
    // }

    // function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value });
    // }
    if (loadingInitial) return <LoadingComponent content="loading activity ..." />

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <Field placeholder='Title' name='title' />
                        <Field placeholder='Description' name='description' />
                        <Field placeholder='Category' name='category'/>
                        <Field type='date' placeholder='Date' name='date' />
                        <Field placeholder='City' name='city' />
                        <Field placeholder='Venue' name='venue' />
                        <Button as={Link} to={'/activities'} floated="right" type="button" content="Cancel" />
                        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                    </Form>
                )}
            </Formik>
        </Segment>

    )

})