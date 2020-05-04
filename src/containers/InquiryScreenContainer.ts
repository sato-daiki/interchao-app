import { connect } from 'react-redux';
import InquiryScreen, { Props } from '../screens/InquiryScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

export default connect(mapStateToProps)(InquiryScreen);
