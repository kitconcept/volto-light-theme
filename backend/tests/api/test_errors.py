def test_error_response_includes_inherit_fields(anon_request):
    response = anon_request.get(
        "/non-existing?expand=inherit&expand.inherit.behaviors=voltolighttheme.header"
    )
    assert response.status_code == 404
    assert "@components" in response.json()
    assert "inherit" in response.json()["@components"]
