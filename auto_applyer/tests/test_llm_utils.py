from auto_applyer.core import llm_utils

def test_extract_keywords():
    kws = llm_utils.extract_keywords("example job")
    assert isinstance(kws, list)
    assert len(kws) > 0
