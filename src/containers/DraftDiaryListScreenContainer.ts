import { connect } from 'react-redux';
import {
  setDraftDiaries,
  setDraftDiaryTotalNum,
} from '../stores/actions/draftDiaryList';
import { State } from '../types/state';
import DraftDiaryListScreen from '../screens/DraftDiaryListScreen';

const mapStateToProps = (state: State) => {
  const { draftDiaries, draftDiaryTotalNum } = state.rootReducer.draftDiaryList;
  return {
    user: state.rootReducer.user,
    draftDiaries,
    draftDiaryTotalNum,
  };
};

const mapDispatchToProps = {
  setDraftDiaries,
  setDraftDiaryTotalNum,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftDiaryListScreen);
