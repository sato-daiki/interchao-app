import { connect } from 'react-redux';
import SelectSubcategoryScreen, {
  Props,
} from '@/screens/SelectSubcategoryScreen/SelectSubcategoryScreen';
import { State } from '@/types/state';

const mapStateToProps = (state: State): Props => ({
  // profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  // setProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSubcategoryScreen);
