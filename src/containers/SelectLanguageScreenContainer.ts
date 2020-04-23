import { connect } from 'react-redux';
import { setProfile } from '../stores/actions/profile';
import SelectLanguageScreen, { Props } from '../screens/SelectLanguageScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  setProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLanguageScreen);
