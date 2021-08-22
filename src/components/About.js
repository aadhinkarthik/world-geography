import { useHistory } from 'react-router-dom';
import Button from './Utilities/Button';

const About = () => {
    const history = useHistory();
    return (
        <div>
            <h2>Assignment</h2>
            <br />
            <h4>World Geography</h4>
            <br />
            <p>
                This contains information about countries and continent areas.
            </p>
            <br />
            <Button
                text="Previous"
                color="orange"
                onClick={() => {
                    history.goBack();
                }}
            ></Button>
        </div>
    );
};

export default About;
