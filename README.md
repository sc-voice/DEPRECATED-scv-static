# scv-static
SuttaCentral Voice static website search adapter for bilara-data

[sc-voice.github.io/scv-static](https://sc-voice.github.io/scv-static/)


## Build
When examples or suttas change, *scv-static* needs to be rebuilt to make
the changes visible for other applications such as *scv-bilara* and *Voice*.
To rebuild *scv-static*, open a Linux terminal window in your local *scv-static* 
repository. Type:

```
scripts/build
git commit -am "build examples"
git push
```

Once the new content is built and committed, Github will automatically deploy
the new content to 
[https:sc-voice.github.io/scv-static](https:sc-voice.github.io/scv-static)

## Deploy
Currently, deployment is set up as a Github Action 
that updates [sc-voice.github.io/scv-static](https://sc-voice.github.io/scv-static).
If the Github Action fails, you can manually deploy *scv-static* as follows:

First build *scv-static* (see above), then
open a Linux terminal window in your local *scv-static* repository and type:

```
scripts/deploy
```



