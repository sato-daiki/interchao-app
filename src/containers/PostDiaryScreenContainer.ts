import { connect } from 'react-redux';
import { State } from '../types/state';
import { setPoints } from '../stores/actions/user';
import { addDiary, setDiaryTotalNum } from '../stores/actions/diaryList';
import {
  addDraftDiary,
  setDraftDiaryTotalNum,
} from '../stores/actions/draftDiaryList';
import PostDiaryScreen from '../screens/PostDiaryScreen';

const mapStateToProps = (state: State) => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
    diaryTotalNum: state.rootReducer.diaryList.diaryTotalNum,
    draftDiaryTotalNum: state.rootReducer.draftDiaryList.draftDiaryTotalNum,
  };
};

const mapDispatchToProps = {
  setPoints,
  addDiary,
  addDraftDiary,
  setDiaryTotalNum,
  setDraftDiaryTotalNum,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDiaryScreen);
