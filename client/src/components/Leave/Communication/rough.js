<Grid
  container
  spacing={2}
  sx={{
    marginTop: "10px",
    padding: { xs: "2px", md: "16px", lg: "24px" },
    flexDirection: { xs: "column", md: "row" },
    width: "100%",
  }}
>
  {matches && <Panel />}
  <Grid
    sx={{
      display: "flex",
      // boxShadow: 2,
      // margin: "10px",
      "@media (max-width: 600px)": {
        flexDirection: "column",
      },
    }}
  >
    <Grid
      item
      xs={12}
      md={7}
      sx={{
        height: "600px",
        overflow: "auto",
        // position: "fixed",
        top: "100px",
        // zIndex: 99999,
        width: "350px",
        pointerEvents: "auto",
        marginLeft: "10px",
        margin: "10px",
      }}
    >
      {verifyTheRole()
        ? sortedPosts.map((post) => (
            <div key={post._id} style={{ marginTop: "10px" }}>
              <Inbox post={post} setCurrentId={setCurrentId} />
              <Divider
                variant="inset"
                sx={{ borderWidth: "1px", fontWeight: "15px" }}
              />
            </div>
          ))
        : verifyManager()
        ? sortedPosts.map(
            (post) =>
              post.department === user.result.department && (
                <div key={post._id} style={{ marginTop: "10px" }}>
                  <Inbox post={post} setCurrentId={setCurrentId} />
                  <Divider
                    variant="inset"
                    sx={{ borderWidth: "1px", fontWeight: "15px" }}
                  />
                </div>
              )
          )
        : sortedPosts.map(
            (post) =>
              post._id === user.result._id && (
                <div key={post._id} style={{ marginTop: "10px" }}>
                  <Inbox post={post} setCurrentId={setCurrentId} />
                  <Divider
                    variant="inset"
                    sx={{ borderWidth: "1px", fontWeight: "15px" }}
                  />
                </div>
              )
          )}
    </Grid>

    <Grid>
      <Grid
        item
        xs={12}
        md={12}
        // lg={9}
        sx={{
          width: "auto",
          height: 600,
          overflowY: "auto",
          // bgcolor: "white",
          position: "relative",
          // marginLeft: "10px",
        }}
      >
        {user &&
          posts.map(
            (post) =>
              post._id === currentId && (
                <div key={post._id}>
                  {" "}
                  {/* Use post._id as the key */}
                  <MessageBody post={post} currentId={currentId} />
                </div>
              )
          )}

        <Grid
          sx={{
            ...(matches && {
              margin: "100px 130px 100px 130px", // Apply gray background if matches is true
            }),
          }}
        >
          <img src={MessageBodyImage} alt="logo" style={{ opacity: "70%" }} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  {/* </Grid> */}
</Grid>;
