import { connect } from 'react-redux';
import SelectThemeSubcategoryScreen, {
  Props,
} from '@/screens/SelectThemeSubcategoryScreen/SelectThemeSubcategoryScreen';
import { State } from '@/types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
  profile: state.rootReducer.profile,
});

export default connect(mapStateToProps)(SelectThemeSubcategoryScreen);
