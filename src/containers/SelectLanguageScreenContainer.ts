import { connect } from 'react-redux';
import { Props } from '@/screens/SelectLanguageScreen/interface';
import SelectLanguageScreen from '@/screens/SelectLanguageScreen/SelectLanguageScreen';
import { setProfile } from '@/stores/actions/profile';
import { State } from '@/types/state';

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
