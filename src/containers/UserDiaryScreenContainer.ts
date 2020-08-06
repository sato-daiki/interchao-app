import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { State } from '../types/state';
import UserDiaryScreen, { Props } from '../screens/UserDiaryScreen';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { profile } = state.rootReducer;
  return {
    profile,
  };
};

export default connect(mapStateToProps)(UserDiaryScreen);
